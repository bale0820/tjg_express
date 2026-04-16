import { viewService } from "@/service/viewService";
import { NextFunction, Request, Response } from "express";


export const viewController = {
    saveLog : async (req: Request, res: Response, next: NextFunction
    ) => {
        const {upk,ppk, categorySubId} = req.body;
        try {
            const data = await viewService.saveViewLog(upk,ppk, categorySubId);

            res.status(200).json(data)
        } catch (err) {
            next(err);
        }

    },

     getRecentSubCategory : async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
            // const data = await viewService.getRecentSubCategory ();

            // res.status(200).json(data)
        } catch (err) {
            next(err);
        }

    },

};