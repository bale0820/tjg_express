import { RowDataPacket } from "mysql2";

export interface Coupon  {
    couponId : number;
    couponDcRate :  number;
    couponQty : number;
}