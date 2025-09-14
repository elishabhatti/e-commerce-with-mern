import { Router } from "express";
import { registerAgent } from "../controller/agent.controller.js";

const router = Router();

router.post("/register-agent", registerAgent);

export default router;
