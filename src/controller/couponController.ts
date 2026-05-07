import { couponService } from "@/service/couponService";
import { NextFunction, Request, Response } from "express";


export const couponController = {
    getUserCoupon: async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
            const user_id = req.user?.id;
            if(!user_id) {
                throw new Error("no user_id");
            }
            const data = await couponService.getUserCouponList(user_id);
            console.log(data);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }

    }

};