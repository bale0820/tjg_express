
import { CartRow } from "@/types/db/cartRow";
import { promisePool as db } from "../config/db";
import { Cart } from "@/types/domain/cart";
import { toCamel } from "@/util/tocamel";
import { ResultSetHeader } from "mysql2";
export const cartRepository = {
    findById: async (id: number): Promise<Cart[]> => {
        const [rows] = await db.query<CartRow[]>(`select c.cid, c.qty, p.image_url, p.product_name, p.price, p.dc, p.count from users u, product p, cart c where c.ppk = p.id and u.id = c.upk and c.upk = ?`, [id]);



        const cartMap = new Map<number, Cart>();

        rows.forEach(row => {
            if (!cartMap.has(row.cid)) {
                cartMap.set(row.cid, {
                    cid: row.cid,
                    qty : row.qty,
                    product: {
                        productName : row.product_name,
                        imageUrl : row.image_url,
                        price : row.price,
                        dc : row.dc,
                        count : row.count
                    }
                });
            }
        });

        return Array.from(cartMap.values());

        // return rows.map(item => toCamel<Cart>(item));
    },

    updateQty : async(cid : number, qty : number) : Promise<boolean> => {
        const [rows] = await db.query<ResultSetHeader>(`update cart set qty = ?  where cid = ? `, [qty, cid]);
        return rows.affectedRows > 0;
    },

    deleteItem : async(cid : number) : Promise<boolean> => {
        const [rows] = await db.query<ResultSetHeader>(`delete from cart where cid = ? `, [cid]);
        return rows.affectedRows > 0;
    }

}    