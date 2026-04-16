import { Router } from "express";
import { advertiseController } from "../controller/advertiseController";



const router = Router();

router.get('/list', advertiseController.getAdvertiseList);

export const  advertiseRoutes = router;