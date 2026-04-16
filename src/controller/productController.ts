import { NextFunction, Request, Response } from "express";
import { productService } from "../service/productService";


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

    }

};
