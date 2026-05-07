import { pricingAnalyticsService } from "@/service/pricingAnalyticsService";
import { NextFunction, Request, Response } from "express";
export const priceController = {
    getAllProductStats: async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
            const result = await pricingAnalyticsService.getAllStats();

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }

    },

    getStats: async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
            const ppk = req.params.ppk as string;
            if(!ppk) {
                throw new Error("no ppk");
            }
            const result = await pricingAnalyticsService.getStats(ppk);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }

    },
        

};