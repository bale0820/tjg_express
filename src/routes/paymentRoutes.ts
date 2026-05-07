
import { paymentController } from "@/controller/paymentController";
import { authMiddleware } from "@/util/authMiddleware";
import { Router } from "express";




const router = Router();

router.post('/kakao/ready', authMiddleware, paymentController.ready);
router.get('/qr/success', paymentController.success);

export const paymentRoutes = router;