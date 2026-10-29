import{ Router } from "express";
import { register, login, profile} from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middlewares.js";

const router= Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", requireAuth,profile);

export default router;
