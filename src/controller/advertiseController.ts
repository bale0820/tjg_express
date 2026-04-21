import { NextFunction, Request, Response } from "express";
import { advertiseService } from "../service/advertiseService";

export const advertiseController = {
    getAdvertiseList: async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
            const data = await advertiseService.getAdvertiseList();

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }

    }

};