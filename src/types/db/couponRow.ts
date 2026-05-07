import { RowDataPacket } from "mysql2";

export interface CouponRow extends RowDataPacket {
    coupon_id : number;
    coupon_dc_rate :  number;
    coupon_qty : number;
}