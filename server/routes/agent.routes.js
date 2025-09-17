import { Router } from "express";
import { registerAgent, getPurchaseProduct } from "../controller/agent.controller.js";

const router = Router();

router.post("/register-agent", registerAgent);
router.get("/get-user-purchase-products", getPurchaseProduct);

export default router;
