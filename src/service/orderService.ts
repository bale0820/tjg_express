import { cartRepository } from "@/repository/cartRepository";
import { orderRepository } from "@/repository/orderRepository";
import { DeliveryStatus } from "@/types/domain/deliveryStatus";
import { Order } from "@/types/domain/order";
import { KakaoApproveResponse } from "@/types/dto/kakaoApproveResponse";
import { KakaoPay } from "@/types/dto/KakaoPay";


export const orderService = {
    getOrdersByUser: async (id: number): Promise<Order[]> => {
        return await orderRepository.findAllWithDetailsByUpk(id);
    },
    saveOrder: async (approve: KakaoApproveResponse, kakaoPay: KakaoPay) => {
        const cartItems = await cartRepository.findAllWithProductByCidIn(kakaoPay.cidList);
        if (cartItems.length == 0) {
            throw new Error("결제할 장바구니 항목이 없습니다.");
        }

        if (!kakaoPay.orderId) {
            throw new Error("no orderId");
        }
        const order: Order = {
            orderCode: kakaoPay.orderId,
            upk: kakaoPay.id,
            deliveryStatus: DeliveryStatus.READY, // enum이면 타입 맞춰줘야 함
            totalAmount: kakaoPay.paymentInfo.totalAmount,
            shippingFee: kakaoPay.paymentInfo.shippingFee,
            discountAmount: kakaoPay.paymentInfo.discountAmount,

            receiverName: kakaoPay.receiver.name,
            receiverPhone: kakaoPay.receiver.phone,
            zipcode: kakaoPay.receiver.zipcode,
            address1: kakaoPay.receiver.address1,
            address2: kakaoPay.receiver.address2,

            tid: approve.tid,
            memo: kakaoPay.receiver.memo,

            odate: new Date(), // 생성 시간
            shippingAt: null,
            deliveredAt: null,
            eta: null,
            orderDetails: [], // 나중에 채움
        };
        for (let i = 0; i < cartItems.length; i++) {
            const c = cartItems[i];
            const orderDetail = {
                ppk : c.product.id,
                productName : c.product.productName,
                qty : c.qty,
                price : c.product.price
            }

            order.orderDetails[i] = orderDetail;
        }


        const cidList = cartItems.map((item) => item.cid);

        orderRepository.save(order, cidList, kakaoPay.couponId, kakaoPay.productInfo);

    }


}