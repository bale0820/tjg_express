import { Order } from "@/types/domain/order";
import { promisePool as db } from "../config/db";
import { OrderRow } from "@/types/db/OrderRow";


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
    od.ppk

  FROM orders o
  LEFT JOIN order_detail od ON o.id = od.order_id
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
                    ppk : row.ppk
                });
            }
        });

        return Array.from(orderMap.values());


    }

}