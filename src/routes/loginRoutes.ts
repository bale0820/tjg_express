import { loginController } from "@/controller/loginController";
import { authMiddleware } from "@/util/authMiddleware";
import { Router } from "express";



const router = Router();

router.post('/login', loginController.login);
router.post('/refresh', loginController.refresh);
router.post('/logout', loginController.logout);
router.get('/user',authMiddleware, loginController.findUserById);
router.post('/idcheck', loginController.findUserIdById);
router.post('/signup', loginController.signup);
router.post('/signup', loginController.signup);
router.post('/social-cookie', loginController.issueSocialCookie);
export const  loginRoutes = router;