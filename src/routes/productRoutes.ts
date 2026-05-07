import { Router } from "express";
import { productController } from "../controller/productController";
import { authMiddleware } from "@/util/authMiddleware";
import { upload } from "@/util/storage";



const router = Router();

router.get('/productList', productController.getProductList);
router.get('/productDetail', productController.getProductDetail);
router.get('/productReviewList', productController.getProductReviewList);
router.post('/productAdd',authMiddleware, upload.array("files"), productController.saveProduct);
router.post('/productUpdate',authMiddleware, upload.array("files"), productController.updateProduct);
export const  productRoutes = router;