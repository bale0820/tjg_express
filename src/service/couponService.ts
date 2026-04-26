import { couponRepository } from "@/repository/couponRepository";
import { UserCoupon } from "@/types/domain/UserCoupon";

export const couponService = {
    getUserCouponList: async (userId : number): Promise<UserCoupon[]> => {
        const data = await couponRepository.findById(userId);
        
        return data;
    }
};
