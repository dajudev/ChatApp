import {Router} from "express";
import { sendMessage,getMessages } from "../Controllers/message.controller.js";
import protectRoute from "../Middleware/protectRoute.js";


const router = Router();

router.get("/:id", protectRoute ,getMessages);
router.post("/send/:id", protectRoute ,sendMessage);


export default router;