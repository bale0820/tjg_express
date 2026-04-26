import { Coupon } from "./coupon";

export interface UserCoupon {
    id : number;
    isUsed :  boolean;
    qty : number;
    userId : number;
    coupon : Coupon;
}