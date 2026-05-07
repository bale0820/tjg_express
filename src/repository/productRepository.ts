import { ProductDetail } from "@/types/domain/productDetail";
import { promisePool as db } from "../config/db";
import { ProductRow } from "@/types/db/productdRow";
import { Product } from "@/types/domain/product";
import { toCamel } from "@/util/tocamel";
import { ProductDetailRow } from "@/types/db/productDetailRow";
import { ProductWithCategory } from "@/types/domain/ProductWithCategory";
import { productReviewRow } from "@/types/db/productReviewRow";
import { ProductReview } from "@/types/domain/productReview";
import { ResultSetHeader } from "mysql2";


export const productRepository = {
    findAll: async (): Promise<ProductWithCategory[]> => {
        const [rows] = await db.query<ProductRow[]>(`SELECT 
  p.id,
  p.allergy_info,
  p.brand_name,
  p.count,
  p.dc,
  p.del_type,
  p.description,
  p.image_url,
  p.image_url_name,
  p.is_hot_deal,
  p.is_member_special,
  p.notes,
  p.origin,
  p.pid,
  p.price,
  p.product_date,
  p.product_description_image,
  p.product_information_image,
  p.product_name,
  p.seller,
  p.unit,
  p.weight,
  p.upk,

  c.id AS sub_id,
  c.display_order,
  c.is_used,
  c.name AS sub_name,
  c.main_id

FROM product p
JOIN category_sub c ON p.category_sub_id = c.id`);

        return rows.map(row => ({
            id: row.id,
            allergyInfo: row.allergy_info,
            brandName: row.brand_name,
            count: row.count,
            dc: row.dc,
            delType: row.del_type,
            description: row.description,
            imageUrl: row.image_url,
            imageUrlName: row.image_url_name,
            hotDeal: row.is_hot_deal,
            memberSpecial: row.is_member_special,
            notes: row.notes,
            origin: row.origin,
            pid: row.pid,
            price: row.price,
            productDate: row.product_date,
            productDescriptionImage: row.product_description_image,
            productInformationImage: row.product_information_image,
            productName: row.product_name,
            seller: row.seller,
            unit: row.unit,
            weight: row.weight,
            user: {
                id : row.upk
            },
            categorySubId: row.category_sub_id,

            categorySub: {
                id: row.sub_id,
                name: row.sub_name,
                mainId: row.main_id,
                displayOrder: row.display_order,
                isUsed: row.is_used
            }
        }));
    },
    findById: async (id: string): Promise<ProductDetail> => {
        const [rows] = await db.query<ProductRow[]>(
            `SELECT * FROM product WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            throw new Error('Product not found');
        }

        return toCamel<ProductDetail>(rows[0]) as ProductDetail;
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




    findAllReviewWithUserName: async (): Promise<ProductReview[]> => {
        const [rows] = await db.query<productReviewRow[]>(
            `select r.id, r.content, r.date, r.images, r.is_best, r.likes, r.ppk, r.product_name, r.tags, r.title, r.upk, u.name from reviews r, users u where r.upk = u.id`,
        );
        if (rows.length === 0) {
            throw new Error('Product not found');
        };

        return rows.map((row) => {
            return toCamel<ProductReview>(row);
        });

    },

    findReviewsById: async (ppk: string): Promise<ProductReview[]> => {
        const [rows] = await db.query<productReviewRow[]>(
            `select * from reviews where ppk =?`, [ppk],
        );


        if (rows.length === 0) {
            throw new Error('Product not found');
        };


        return rows.map((row) => {
            return toCamel<ProductReview>(row);
        });

    },

    save: async (product: ProductWithCategory): Promise<boolean> => {

        const [rows] = await db.query<ResultSetHeader>(`
    INSERT INTO product (
      allergy_info,
      brand_name,
      count,
      dc,
      del_type,
      description,
      image_url,
      image_url_name,
      is_hot_deal,
      is_member_special,
      notes,
      origin,
      pid,
      price,
      product_date,
      product_description_image,
      product_information_image,
      product_name,
      seller,
      unit,
      weight,
      category_sub_id,
      upk
    )
    VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `, [
            product.allergyInfo,
            product.brandName,
            product.count,
            product.dc,
            product.delType,
            product.description,
            product.imageUrl,
            product.imageUrlName,
            product.hotDeal,
            product.memberSpecial,
            product.notes,
            product.origin,
            product.pid,
            product.price,
            product.productDate,
            product.productDescriptionImage,
            product.productInformationImage,
            product.productName,
            product.seller,
            product.unit,
            product.weight,
            product.categorySub.id,
            product.upk
        ]);

        return rows.affectedRows > 0;
    },


    update: async (product: ProductWithCategory): Promise<boolean> => {

    const [rows] = await db.query<ResultSetHeader>(`
        UPDATE product
        SET
            allergy_info = ?,
            brand_name = ?,
            count = ?,
            dc = ?,
            del_type = ?,
            description = ?,
            image_url = ?,
            image_url_name = ?,
            is_hot_deal = ?,
            is_member_special = ?,
            notes = ?,
            origin = ?,
            price = ?,
            product_date = ?,
            product_description_image = ?,
            product_information_image = ?,
            product_name = ?,
            seller = ?,
            unit = ?,
            weight = ?,
            category_sub_id = ?,
            upk = ?
        WHERE id = ?
    `, [
        product.allergyInfo,
        product.brandName,
        product.count,
        product.dc,
        product.delType,
        product.description,
        product.imageUrl,
        product.imageUrlName,
        product.hotDeal,
        product.memberSpecial,
        product.notes,
        product.origin,
        product.price,
        product.productDate,
        product.productDescriptionImage,
        product.productInformationImage,
        product.productName,
        product.seller,
        product.unit,
        product.weight,
        product.categorySub?.id ?? null,
        product.upk,
        product.id
    ]);

    return rows.affectedRows > 0;

}

}
