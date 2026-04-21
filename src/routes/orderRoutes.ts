import { orderController } from "@/controller/orderController";
import { authMiddleware } from "@/util/authMiddleware";
import { Router } from "express";




const router = Router();

router.get('/my/:id', authMiddleware, orderController.getMyOrders);
export const orderRoutes = router;