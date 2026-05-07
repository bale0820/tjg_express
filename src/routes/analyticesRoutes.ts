import { analyticsController } from "@/controller/analyticsCotroller";
import { authMiddleware } from "@/util/authMiddleware";
import { Router } from "express";



const router = Router();

router.get("/conversion",authMiddleware, analyticsController.getConversionRates);


export const analyticesRoutes = router;