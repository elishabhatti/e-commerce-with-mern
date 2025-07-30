import { Router } from "express";
import {
  registerAdmin,
  getAllUsers,
  getAllProducts,
  getAllPurchaseProducts,
  getAllContacts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  deleteUser,
  deleteOrder,
  getPurchaseProductById,
  deleteContact,
  getContactById,
  getProfileDataAdmin,
} from "../controller/admin.controller.js";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.js";

const router = Router();

router.post("/register-admin", registerAdmin);
router.get("/users", getAllUsers);
router.get("/products", getAllProducts);
router.get("/purchase", getAllPurchaseProducts);
router.get("/contact", getAllContacts);
router.post("/create-product", createProduct);
router.get("/delete-product/:id", deleteProduct);
router.get("/delete-user/:id", deleteUser);
router.get("/delete-order/:id", deleteOrder);
router.get("/delete-contact/:id", deleteContact);
router.get("/get-product/:id", getProductById);
router.get("/get-contact/:id", getContactById);
router.get("/get-purchase-product/:id", getPurchaseProductById);
router.put("/update-product/:id", updateProduct);
router.get("/get-profile", verifyAuthentication, getProfileDataAdmin);

export default router;
