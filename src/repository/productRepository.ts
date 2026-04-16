import { ProductDetail } from "@/types/domain/productDetail";
import { promisePool as db } from "../config/db";
import { ProductRow } from "@/types/db/productdRow";
import { Product } from "@/types/domain/product";
import { toCamel } from "@/util/tocamel";
import { ProductDetailRow } from "@/types/db/productDetailRow";


export const productRepository = {
    findAll: async (): Promise<Product[]> => {
        const [rows] = await db.query<ProductRow[]>(`select * from product`);

        return rows.map(item => toCamel<Product>(item)) as Product[];
    },
    findProductDetailById: async (id: string): Promise<ProductDetail> => {
        const [rows] = await db.query<ProductDetailRow[]>(
            `SELECT * FROM view_product_detail WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            throw new Error('Product not found');
        }
        
        return toCamel<ProductDetail>(rows[0]) as ProductDetail;
    },

}
