import { categoryService } from "@/service/categoryService";
import { NextFunction, Request, Response } from "express";


export const categoryController = {
    getCategoryList: async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
            const data = await categoryService.getCategoryList();

            res.status(200).json(data)
        } catch (err) {
            next(err);
        }

    }

};