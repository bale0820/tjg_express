import { Router } from "express";
import { productController } from "../controller/productController";



const router = Router();

router.get('/productList', productController.getProductList);
router.get('/productDetail', productController.getProductDetail);
export const  productRoutes = router;