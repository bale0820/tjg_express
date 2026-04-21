import { cartService } from "@/service/cartService";
import { NextFunction, Request, Response } from "express";

export const cartCotroller = {
    
    cartList : async (req : Request, res : Response, next : NextFunction) => {
        try {

            if(!req.user) {

                return res.status(401).json({ error: "Unauthorized" });
                
            }
            const id = req.user?.id;


           const cartList = await cartService.cartList(id);

        return res.json(cartList);
    
            



        }catch(err) {
            next(err);
        }
    },

    updateQty : async(req : Request, res : Response, next : NextFunction) => {

        try {
            const {cid , qty} = req.body;
            const result = await cartService.updateQty(cid, qty);
            if(result) {
                res.status(200).send();
            }
        }catch(err) {
            next(err);
        }


    },

    deleteItem : async(req : Request, res : Response, next : NextFunction) => {

        try {
            const {cid} = req.body;
            const result = await cartService.deleteItem(cid);
            if(result) {
                res.status(200).send();
            }
        }catch(err) {
            next(err);
        }


    },

}