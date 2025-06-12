import { contactModel } from "../models/contact.model.js";

export const contactUs = async (req, res) => {
  const { name, email, message } = req.body;
  const user = req.user.id;
  console.log(user);

  try {
    if (!name || !email || !message) {
      return res.status(404).json({ message: "All field are required" });
    }

    const createdContact = await contactModel.create({
      user,
      name,
      email,
      message,
    });
    res.status(200).json({ message: "Contact Added", createdContact });
  } catch (error) {
    console.error("Error from contact us controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUserContact = async (req, res) => {
  try {
    const getContact = await contactModel.find({ user: req.user.id });
    if (!getContact)
      return res.status(500).json({ message: "Contact Not Found" });

    res.status(200).json({ data: getContact });
  } catch (error) {
    console.error("Error from get all user contact", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
