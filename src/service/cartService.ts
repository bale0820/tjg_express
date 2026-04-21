import { cartRepository } from "@/repository/cartRepository";
import { Cart } from "@/types/domain/cart";
import { NextFunction, Request, Response } from "express";


export const cartService = {
    async cartList(id : number) : Promise<Cart[]>  {
            return  await cartRepository.findById(id);
    },

    async updateQty(cid : number, qty: number) : Promise<boolean>{
        const result = cartRepository.updateQty(cid, qty);
        
        return result;
    },

     async deleteItem(cid : number) : Promise<boolean>{
        const result = cartRepository.deleteItem(cid);
        
        return result;
    },


}