import { viewService } from "@/service/viewService";
import { NextFunction, Request, Response } from "express";


export const viewController = {
    saveLog: async (req: Request, res: Response, next: NextFunction
    ) => {
        const { upk, ppk, categorySubId } = req.body;
        try {
            const data = await viewService.saveViewLog(upk, ppk, categorySubId);

            res.status(200).json(data)
        } catch (err) {
            next(err);
        }

    },

    getRecentSubCategory: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const { id } = req.user;

            const result = await viewService.getRecentSubCategory(id);

            if (result === null) {
                return res.json({ recentSubCategory: null });
            }

            return res.json({
                recentSubCategory: result 
            });

        } catch (err) {
            next(err);
        }
    }

};