import { Router } from "express";
import { registerAgent, getPurchaseProduct, updateStatus } from "../controller/agent.controller.js";

const router = Router();

router.post("/register-agent", registerAgent);
router.get("/get-user-purchase-products", getPurchaseProduct);
router.get("/update-status/", updateStatus);

export default router;
