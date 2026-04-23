import { Router } from "express";
import { viewController } from "@/controller/viewController";
import { authMiddleware } from "@/util/authMiddleware";



const router = Router();

router.post('/log', viewController.saveLog);
router.get('/recent-subcat/:id',authMiddleware, viewController.getRecentSubCategory);
export const  viewRoutes = router;