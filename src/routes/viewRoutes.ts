import { Router } from "express";
import { viewController } from "@/controller/viewController";



const router = Router();

router.post('/log', viewController.saveLog);
router.get('/recent-subcat', viewController.getRecentSubCategory);
export const  viewRoutes = router;