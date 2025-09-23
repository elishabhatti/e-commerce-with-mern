import { purchaseModel } from "../models/purchase.model.js";
import { userModel } from "../models/user.models.js";

export const createPurchase = async (req, res) => {
    try {
        const { productId, size, quantity, paymentMethod, transactionId } =
            req.body;

        const userId = req.user.id;
        const user = await userModel.findById(userId);

        if (!user.address)
            return res.status(400).json({ message: "Fill the Address First" });

        if (!user.phone)
            return res
                .status(400)
                .json({ message: "Fill the Phone Number First" });

        // set payment status
        let paymentStatus = "pending";
        if (paymentMethod === "JazzCash" || paymentMethod === "EasyPaisa") {
            paymentStatus = "paid"; // dummy case: assume payment done
        }

        const newPurchase = await purchaseModel.create({
            user: userId,
            product: productId,
            size,
            quantity,
            paymentMethod,
            paymentStatus,
            transactionId: transactionId || null,
        });

        res.status(201).json({
            message: "Product purchased successfully",
            data: newPurchase,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to buy product",
            error: error.message,
        });
    }
};

export const getPurchaseProduct = async (req, res) => {
    if (!req.user) return res.status(400).send("Login");

    try {
        const getProduct = await purchaseModel
            .find({ user: req.user.id })
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

export const removePurchaseProduct = async (req, res) => {
    if (!req.user) return res.status(400).send("Login");

    try {
        const productId = req.params.id;
        const deleteProduct = await purchaseModel.findByIdAndDelete(productId);

        if (!deleteProduct)
            return res.status(500).json({ message: "Product not Deleted" });

        res.status(200).json({
            data: deleteProduct,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to get products", error });
    }
};

export const getPurchaseProductById = async (req, res) => {
    if (!req.user) return res.status(400).send("Login");

    try {
        const getPurchasedProduct = await purchaseModel
            .findOne({ _id: req.params.id, user: req.user.id })
            .populate("product");

        if (!getPurchasedProduct) {
            return res.status(404).json({ message: "Cart product not found" });
        }

        res.status(200).json({
            data: getPurchasedProduct,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to get product", error });
    }
};

export const updatePurchaseItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, size } = req.body;
        const userId = req.user.id;

        if (!quantity || isNaN(quantity)) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a number",
            });
        }

        if (quantity < 1 || quantity > 100) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be between 1 and 100",
            });
        }

        const purchaseItem = await purchaseModel
            .findOne({ _id: id, user: userId })
            .populate("product");

        if (!purchaseItem) {
            return res.status(404).json({
                success: false,
                message: "Purchase item not found",
            });
        }

        if (purchaseItem.product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${purchaseItem.product.stock} items available in stock`,
            });
        }

        purchaseItem.quantity = quantity;
        if (size) purchaseItem.size = size;

        await purchaseItem.save();

        res.status(200).json({
            success: true,
            message: "Purchase updated successfully",
            data: purchaseItem,
        });
    } catch (error) {
        console.error("Error updating purchase item:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const reviewProduct = async (req, res) => {
    try {
        const { purchaseId, review } = req.body;

        if (!purchaseId || !review) {
            return res.status(400).json({ message: "Missing fields" });
        }

        // Update the purchase document with review
        const updatedPurchase = await purchaseModel.findByIdAndUpdate(
            purchaseId,
            { review },
            { new: true } // return updated document
        );

        if (!updatedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        res.json({
            message: "Review added successfully",
            purchase: updatedPurchase,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
