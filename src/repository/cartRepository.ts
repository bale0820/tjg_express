
import { CartRow } from "@/types/db/cartRow";
import { promisePool as db } from "../config/db";
import { Cartitem } from "@/types/dto/cartItem";
import { toCamel } from "@/util/tocamel";
import { ResultSetHeader } from "mysql2";
import { Cart } from "@/types/domain/cart";
import { CreateCartDto } from "@/types/dto/createCartDto";
export const cartRepository = {
    findById: async (id: number): Promise<Cartitem[]> => {
        const [rows] = await db.query<CartRow[]>(`select c.cid, c.qty, p.image_url, p.product_name, p.price, p.dc, p.count from users u, product p, cart c where c.ppk = p.id and u.id = c.upk and c.upk = ?`, [id]);



        const cartMap = new Map<number, Cartitem>();

        rows.forEach(row => {
            if (!cartMap.has(row.cid)) {
                cartMap.set(row.cid, {
                    cid: row.cid,
                    qty: row.qty,
                    product: {
                        productName: row.product_name,
                        imageUrl: row.image_url,
                        price: row.price,
                        dc: row.dc,
                        count: row.count
                    }
                });
            }
        });

        return Array.from(cartMap.values());

        // return rows.map(item => toCamel<Cart>(item));
    },

    updateQty: async (cid: number, qty: number): Promise<boolean> => {
        const [rows] = await db.query<ResultSetHeader>(`update cart set qty = ?  where cid = ? `, [qty, cid]);
        return rows.affectedRows > 0;
    },

    deleteItem: async (cid: number): Promise<boolean> => {
        const [rows] = await db.query<ResultSetHeader>(`delete from cart where cid = ? `, [cid]);
        return rows.affectedRows > 0;
    },


    findByPpkAndUpk: async (ppk: number, upk: number): Promise<Cart[]> => {
        const [rows] = await db.query<CartRow[]>(`
            select * from Cart where ppk =? and upk = ?`, [ppk, upk]);

        return rows.map(row => toCamel<Cart>(row));

    },

    save: async (c: CreateCartDto): Promise<boolean> => {
        const [rows] = await db.query<ResultSetHeader>(`
            INSERT INTO cart (added_at, qty, ppk, upk)
VALUES (?, ?, ?, ?)
ON DUPLICATE KEY UPDATE qty = qty + VALUES(qty);`, [c.addedAt, c.qty, c.ppk, c.upk]);
        return rows.affectedRows > 0;
    },

    updateCart: async (c: CreateCartDto): Promise<boolean> => {
        const [rows] = await db.query<ResultSetHeader>(`
            update cart set qty = ? where ppk = ? and upk = ?`, [c.qty, c.ppk, c.upk]);
        return rows.affectedRows > 0;
    },

}    