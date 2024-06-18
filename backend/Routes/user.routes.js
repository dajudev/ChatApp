import {Router} from "express";
import protectRoute from "../Middleware/protectRoute.js";
import { getUsersForSidebar } from "../Controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute ,getUsersForSidebar);

export default router;