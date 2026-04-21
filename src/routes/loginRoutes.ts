import { loginController } from "@/controller/loginController";
import { authMiddleware } from "@/util/authMiddleware";
import { Router } from "express";



const router = Router();

router.post('/login', loginController.login);
router.post('/refresh', loginController.refresh);
router.post('/logout', loginController.logout);
router.get('/user',authMiddleware, loginController.findUserById);
export const  loginRoutes = router;