import { deliveryController } from "@/controller/deliveryController";
import { Router } from "express";




const router = Router();

router.get("/deliveryList",deliveryController.getDeliveryList);


export const deliveryRoutes = router;