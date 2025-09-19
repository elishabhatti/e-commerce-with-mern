import { sendEmail } from "../lib/sendEmailForgotPassword.js";
import { purchaseModel } from "../models/purchase.model.js";
import { userModel } from "../models/user.models.js";
import { authenticateUser, hashPassword } from "../services/user.services.js";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";
import mjml2html from "mjml";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerAgent = async (req, res) => {
    try {
        const { name, email, password, address, phone, avatar, agentSecret } =
            req.body;

        if (agentSecret !== process.env.AGENT_SECRET_KEY) {
            return res
                .status(403)
                .json({ message: "Invalid agent secret key." });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "Agent with this email already exists." });
        }

        const hashedPassword = await hashPassword(password);

        const newAgent = await userModel.create({
            name,
            email,
            isEmailVerified: true,
            password: hashedPassword,
            address,
            phone,
            avatar,
            role: "agent",
        });

        console.log(newAgent);

        const accessToken = await authenticateUser({
            req,
            res,
            user: newAgent,
        });

        res.status(201).json({
            id: newAgent._id,
            email: email,
            username: newAgent.name,
            token: accessToken,
            message: "Agent registered and authenticated successfully",
        });
    } catch (error) {
        console.error("Agent registration error:", error);
        res.status(500).json({
            message: "Server error. Please try again later.",
        });
    }
};

export const getPurchaseProduct = async (req, res) => {
    try {
        const getProduct = await purchaseModel
            .find()
            .populate("product")
            .populate("user");

        res.status(200).json({
            data: getProduct,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to get products", error });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { shippingStatus } = req.body;

        const updatedPurchase = await purchaseModel
            .findByIdAndUpdate(id, { shippingStatus }, { new: true })
            .populate("user");

        if (!updatedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        const mjmlTemplate = await fs.readFile(
            path.join(__dirname, "..", "emails", "shipping-status.mjml"),
            "utf-8"
        );

        const filledTemplate = ejs.render(mjmlTemplate, {
            name: updatedPurchase.user.name,
            shippingStatus: updatedPurchase.shippingStatus,
        });

        const htmlOutput = mjml2html(filledTemplate).html;

        await sendEmail({
            to: updatedPurchase.user.email,
            subject: "Shipping Status",
            html: htmlOutput
        });

        res.status(200).json({
            message: "Status updated",
            data: updatedPurchase,
        });
    } catch (err) {
        console.error("Error updating status:", err);
        res.status(500).json({ message: "Failed to update status", err });
    }
};
