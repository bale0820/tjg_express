import { RowDataPacket } from "mysql2";
import { DeliveryStatus } from "../domain/deliveryStatus";

export interface OrderRow extends RowDataPacket {
    order_id: number;
    order_code: string;
    upk: number;

    total_amount: number;
    shipping_fee: number;
    discount_amount: number;

    receiver_name: string;
    receiver_phone: string;
    zipcode: string;
    address1: string;
    address2: string;
    memo: string;

    odate: Date;
    shipping_at: Date | null;
    delivered_at: Date | null;
    eta: Date | null;

    delivery_status: DeliveryStatus | null;
    tid: string | null;

    detail_id: number;
    ppk: number;
    price: number;
    product_name: string;
    qty: number;
    detail_order_id : number;

}