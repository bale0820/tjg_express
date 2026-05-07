import { json, NextFunction, Request, Response } from "express";
import { productService } from "../service/productService";
import { Product } from "@/types/domain/product";
import { ProductWithCategory } from "@/types/domain/ProductWithCategory";


export const productController = {
    getProductList: async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
            const data = await productService.getProductList();

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }

    },


    getProductDetail: async (req: Request, res: Response, next: NextFunction
    ) => {
        const id = req.query.id as string;
        try {
            const data = await productService.getProductDetail(id);

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }

    },

    getProductReviewList: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await productService.getProductRevieList();
            return res.json(data);
        } catch (err) {
            next(err);
        }

    },

    saveProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                throw new Error("no token");
            }
            const upk = req.user?.id;
            const productJson = req.body.product;

            if (!productJson) {
                throw new Error("product 데이터 없음");
            }

            // 2️⃣ JSON 파싱
            const product : ProductWithCategory = JSON.parse(productJson);
            product.upk =  upk;
            // 3️⃣ 파일들
            const files = req.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                throw new Error("파일 없음");
            }
            const result = await productService.saveProduct(product, files);

            if (result) {
                return res.status(201).json({
                    success: true
                });
            }

            throw new Error("no save");





        } catch (err) {
            next(err);
        }


    },
     updateProduct : async(req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.user || !req.body.product) {
                throw new Error("no token");
            }
            const upk = req.user?.id;
            const p = req.body.product;
            const product = JSON.parse(p);
            const files = req.files as Express.Multer.File[];
            product.upk = upk;
              if (!files || files.length === 0) {
                throw new Error("파일 없음");
            }
            const result = await productService.updateProduct(product, files);

            if (result) {
                return res.status(201).json({
                    success: true
                });
            }

            throw new Error("no save");
        }catch(err){            
            next(err);
        }
     }

};
