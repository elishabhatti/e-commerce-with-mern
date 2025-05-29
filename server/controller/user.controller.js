import { userModel } from "../models/user.models.js";

export const registerUser = async (req, res) => {
  const { name, email, password, phone, address, avatar } = req.body;
  try {
    const createdUser = await userModel.create({
      name,
      email,
      password,
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
