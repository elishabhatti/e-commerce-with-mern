import { Router } from "express";
import { contactUs, getAllUserContact } from "../controller/contact.controller.js";

const router = Router();

router.post("/add-contact", contactUs);
router.get("/get-contact", getAllUserContact);

export default router;
