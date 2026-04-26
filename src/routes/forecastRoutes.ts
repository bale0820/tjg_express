import { couponController } from "@/controller/couponController";
import { forecastController } from "@/controller/forecastController";
import { authMiddleware } from "@/util/authMiddleware";
import { Router } from "express";

const router = Router();

router.get('/sales/:ppk', authMiddleware, forecastController.getDailySales);
router.get('/predict/:ppk', authMiddleware, forecastController.runForecast);
export const forecastRoutes = router;