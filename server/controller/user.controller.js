import { userModel } from "../models/user.models.js";
import { createUser, hashPassword } from "../services/user.services.js";

export const registerUser = async (req, res) => {
  const { name, email, password, phone, address, avatar } = req.body;

  if (!name || !email || !password || !phone || !address || !avatar) {
    return res.status(401).json({ message: "All field are required" });
  }

  const hashedPassword = await hashPassword(password);
  try {
    const createdUser = await createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      avatar,
    });
    res.status(201).json({ message: createdUser });
  } catch (error) {
    res.status(500).json({ message: error });
    console.error("Error from User Register Controller: ", error);
  }
};
