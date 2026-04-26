import { toCamel } from "@/util/tocamel";
import { promisePool as db } from "../config/db";
import { UserCoupon } from "@/types/domain/UserCoupon";
import { UserCouponRow } from "@/types/db/UsercouponRow";



export const couponRepository = {
    findById: async (user_id: number): Promise<UserCoupon[]> => {
        const [rows] = await db.query<UserCouponRow[]>(
            `select * from user_coupon u inner join coupon c where u.coupon_id = c.coupon_id and user_id = ?`,
            [user_id]
        );

        const userCouponMap = new Map<number, UserCoupon>();
        rows.map((row) => {
            if (!userCouponMap.has(row.id)) {
                userCouponMap.set(row.id, {
                    id: row.id,
                    isUsed: row.is_used[0] === 1,
                    qty: row.qty,
                    userId: row.user_id,
                    coupon: {
                        couponId: row.coupon_id,
                        couponDcRate: row.coupon_dc_rate,
                        couponQty: row.coupon_qty
                    }
                }
                );
            }
        });

       

        return Array.from(userCouponMap.values());
    },

}
