import { analyticsController } from "@/controller/analyticsCotroller";
import { forecastController } from "@/controller/forecastController";
import { authMiddleware } from "@/util/authMiddleware";
import { Router } from "express";




const router = Router();

router.post("/forecast",authMiddleware, forecastController.exportForecast);
router.post("/conversion",authMiddleware, analyticsController.exportConvertion);

export const excelRoutes =  router;