import { reviewAnalysisService } from "@/service/reviewAnalysisService";
import { NextFunction, Request, Response } from "express";

export const reviewAnalysisController = {
    analyze: async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
            const ppk = req.params.ppk as string;

            if(!ppk) {
                throw new Error("No ppk");
            }
            const result = await reviewAnalysisService.analyzeReviews(ppk);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }

    }

};