import { priceController } from "@/controller/priceController";
import { reviewAnalysisController } from "@/controller/reviewAnalysisController";
import { Router } from "express";



const router = Router();

router.get("/pricing/all", priceController.getAllProductStats);
router.get("/pricing/:ppk", priceController.getStats);
router.get("/reviews/analysis/:ppk", reviewAnalysisController.analyze );

export const  priceRoutes =  router;