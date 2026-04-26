import { RowDataPacket } from "mysql2";

export interface UserCouponRow extends RowDataPacket {
    id : number;
    is_used :  Buffer;
    qty : number;
    user_id : number;
    coupon_id : number;
    coupon_dc_rate : number;
    coupon_qty : number;
}