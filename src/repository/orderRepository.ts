import { Order } from "@/types/domain/order";
import { promisePool as db } from "../config/db";
import { OrderRow } from "@/types/db/OrderRow";
import { ResultSetHeader } from "mysql2";
import { ProductInfo } from "@/types/dto/productInfo";
import { DailySalesDto } from "@/types/dto/dailySalesDto";
import { DailySalesDtoRow } from "@/types/db/DailySalesDtoRow";


export const orderRepository = {
    findAllWithDetailsByUpk: async (id: number): Promise<Order[]> => {
        const [rows] = await db.query<OrderRow[]>(`
  SELECT 
    o.id AS order_id,
    o.order_code,
    o.upk,
    o.total_amount,
    o.shipping_fee,
    o.discount_amount,
    o.receiver_name,
    o.receiver_phone,
    o.zipcode,
    o.address1,
    o.address2,
    o.memo,
    o.odate,
    o.shipping_at,
    o.delivered_at,
    o.eta,
    o.delivery_status,
    o.tid,

    od.id AS detail_id,
    od.order_id AS detail_order_id,
    od.product_name,
    od.qty,
    od.price,
    od.ppk,
    p.image_url,
    p.count

  FROM orders o
  LEFT JOIN order_detail od ON o.id = od.order_id LEFT JOIN product p on p.id = od.ppk
  WHERE o.upk = ?
`, [id]);

        const orderMap = new Map<number, Order>();

        rows.forEach(row => {
            if (!orderMap.has(row.order_id)) {
                orderMap.set(row.order_id, {
                    id: row.order_id,
                    orderCode: row.order_code,
                    upk: row.upk,
                    totalAmount: row.total_amount,
                    shippingFee: row.shipping_fee,
                    discountAmount: row.discount_amount,
                    receiverName: row.receiver_name,
                    receiverPhone: row.receiver_phone,
                    zipcode: row.zipcode,
                    address1: row.address1,
                    address2: row.address2,
                    memo: row.memo,
                    odate: row.odate,
                    shippingAt: row.shipping_at,
                    deliveredAt: row.delivered_at,
                    eta: row.eta,
                    deliveryStatus: row.delivery_status,
                    tid: row.tid,
                    orderDetails: []
                });
            }

            // LEFT JOIN이라 detail 없을 수도 있음
            if (row.detail_id) {
                orderMap.get(row.order_id)!.orderDetails.push({
                    id: row.detail_id,
                    orderId: row.detail_order_id,
                    productName: row.product_name,
                    qty: row.qty,
                    price: row.price,
                    ppk: row.ppk,
                    product: {
                        imageUrl: row.image_url,
                        count: row.count
                    }
                });
            }
        });

        return Array.from(orderMap.values());


    },

    save: async (order: Order, cidList: number[], userCouponId: number, productList: ProductInfo[]) => {
        const conn = await db.getConnection();

        try {
            await conn.beginTransaction();

            // 1. order insert
            const [result] = await conn.query<ResultSetHeader>(
                `
      INSERT INTO orders (
        order_code, upk, delivery_status,
        total_amount, shipping_fee, discount_amount,
        receiver_name, receiver_phone,
        zipcode, address1, address2,
        tid, memo, odate
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `,
                [
                    order.orderCode,
                    order.upk,
                    order.deliveryStatus,
                    order.totalAmount,
                    order.shippingFee,
                    order.discountAmount,
                    order.receiverName,
                    order.receiverPhone,
                    order.zipcode,
                    order.address1,
                    order.address2,
                    order.tid,
                    order.memo
                ]
            );

            const orderId = result.insertId;

            // 2. orderDetail insert (bulk 추천 ⭐)
            const values = order.orderDetails.map(d => [
                orderId,
                d.ppk,
                d.productName,
                d.qty,
                d.price
            ]);

            await conn.query(
                `
      INSERT INTO order_detail 
      (order_id, ppk, product_name, qty, price)
      VALUES ?
      `,
                [values]
            );


            await conn.query(
                `
      delete from cart where cid in (?)
      `,
                [cidList]
            );

            await conn.query(
                `
      delete from user_coupon where id = ?
      `,
                [userCouponId]
            );

            await conn.query(
                `
      delete from user_coupon where id = ?
      `,
                [userCouponId]
            );

            for (const item of productList) {
                const [result] = await conn.query<ResultSetHeader>(
                    `
    UPDATE product 
    SET count = count - ?
    WHERE id = ? AND count >= ?
    `,
                    [item.qty, item.pid, item.qty]
                );

                if (result.affectedRows === 0) {
                    throw new Error("재고 부족");
                }
            }






            await conn.commit();

            return orderId;

        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    },



    findDailySalesByProduct: async (ppk: string): Promise<DailySalesDtoRow[]> => {
        const [rows] = await db.query<DailySalesDtoRow[]>(
            `
  SELECT DATE_FORMAT(o.odate, '%Y-%m-%d') AS odate,
         SUM(od.qty) AS qty
  FROM orders o
  JOIN order_detail od ON o.id = od.order_id
  WHERE od.ppk = ?
  GROUP BY DATE_FORMAT(o.odate, '%Y-%m-%d')
  ORDER BY odate
  `,
            [ppk]
        );
        return rows;
    }

}