
import { couponController } from "@/controller/couponController";
import { authMiddleware } from "@/util/authMiddleware";
import { Router } from "express";




const router = Router();

router.get('/my/:id', authMiddleware, couponController.getUserCoupon);
export const couponRoutes = router;