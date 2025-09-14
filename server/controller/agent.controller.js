import { authenticateUser, hashPassword } from "../services/user.services.js";

export const registerAgent = async (req, res) => {
  try {
    const { name, email, password, address, phone, avatar, agentSecret } =
      req.body;

    if (agentSecret !== process.env.AGENT_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid agent secret key." });
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

    console.log(newAdmin);

    const accessToken = await authenticateUser({ req, res, user: newAgent });

    res.status(201).json({
      id: newAdmin._id,
      email: email,
      username: newAdmin.name,
      token: accessToken,
      message: "Agent registered and authenticated successfully",
    });
  } catch (error) {
    console.error("Agent registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
