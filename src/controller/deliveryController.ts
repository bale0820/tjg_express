import { delivertService } from "@/service/delivertService";
import { NextFunction, Request, Response } from "express";

export const deliveryController = {
    getDeliveryList : async(req : Request, res : Response, next : NextFunction) => {
        try {

            const result = await delivertService.getDeliveryList();

            if(result.length === 0) {
                throw new Error("no list");
            }else {
                res.json(result);
            }
        }catch(err) {
            next(err);
        }

            


    }



}