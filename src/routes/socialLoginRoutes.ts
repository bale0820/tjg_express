import { socialLoginController } from "@/controller/socialLoginController";
import { Router } from "express";




const router = Router();

router.get('/authorization/naver', socialLoginController.loginNaver);
router.get('/naver/callback', socialLoginController.naverCallback);
export const  socialLoginRoutes = router;