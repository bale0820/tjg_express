import { cartRepository } from "@/repository/cartRepository";
import { Cartitem } from "@/types/dto/cartItem";
import { NextFunction, Request, Response } from "express";


export const cartService = {
    async cartList(id : number) : Promise<Cartitem[]>  {
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


    async addCart(qty : number, ppk : number, upk : number) : Promise<boolean> {
        const findResult = await cartRepository.findByPpkAndUpk(ppk, upk);


        if(findResult.length === 0) {
            const cartData = {
                qty,
                ppk,
                upk,
                addedAt: new Date()
            }

            return cartRepository.save(cartData);
        }
        
        findResult[0].qty += qty;
        return await cartRepository.updateCart(findResult[0]);
    }


}