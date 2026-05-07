import { socialLoginController } from "@/controller/socialLoginController";
import { Router } from "express";




const router = Router();

router.get('/authorization/naver', socialLoginController.loginNaver);
router.get('/authorization/kakao', socialLoginController.loginKakao);
router.get('/naver/callback', socialLoginController.naverCallback);
router.get('/kakao/callback', socialLoginController.kakaoCallback);

export const  socialLoginRoutes = router;