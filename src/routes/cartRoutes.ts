import { cartCotroller } from "@/controller/cartCotroller";
import { authMiddleware } from "@/util/authMiddleware";
import { Router } from "express";




const router = Router();

router.post("/cartList", authMiddleware ,cartCotroller.cartList);
router.post("/updateQty", authMiddleware ,cartCotroller.updateQty);
router.post("/deleteItem", authMiddleware ,cartCotroller.deleteItem);
router.post("/add", authMiddleware ,cartCotroller.addCart);
export const cartRoutes = router;