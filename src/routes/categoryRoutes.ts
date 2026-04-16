import { Router } from "express";
import { categoryController } from "../controller/categoryController";



const router = Router();

router.get('/list', categoryController.getCategoryList);

export const  categoryRoutes = router;