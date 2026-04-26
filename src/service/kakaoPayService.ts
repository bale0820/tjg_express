import { KakaoPay } from "@/types/dto/KakaoPay";
import axios from "axios";
import qs from "qs";


const KAKAO_PAY_HOST = "https://kapi.kakao.com";
const READY_PATH = "/v1/payment/ready";
const CID = "TC0ONETIME"; // 테스트용
const ADMIN_KEY = process.env.KAKAO_ADMIN_KEY!;
const backendUrl = "http://localhost:8080";
const tidStore = new Map<string, string>();
const user_id = "test";

export const kakaoPayService = {
    async ready(kakaoPay: KakaoPay): Promise<any> {
        const url = `${KAKAO_PAY_HOST}${READY_PATH}`;

        const params = new URLSearchParams();

        params.append("cid", CID);
        params.append("partner_order_id", kakaoPay.orderId as string);
        params.append("partner_user_id", user_id);
        params.append("item_name", kakaoPay.itemName);
        params.append("quantity", String(kakaoPay.qty));
        params.append("total_amount", String(kakaoPay.totalAmount));
        params.append("tax_free_amount", "0");

        params.append(
            "approval_url",
            `${backendUrl}/payment/qr/success?orderId=${kakaoPay.orderId}`
        );
        params.append(
            "cancel_url",
            `${backendUrl}/payment/qr/cancel?orderId=${kakaoPay.orderId}`
        );
        params.append(
            "fail_url",
            `${backendUrl}/payment/qr/fail?orderId=${kakaoPay.orderId}`
        );

        const response = await axios.post(url, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                Authorization: `KakaoAK ${ADMIN_KEY}`,
            },
        });

        const res = response.data;

        // tid 저장 (Spring Map이랑 동일)
        tidStore.set(kakaoPay.orderId as string, res.tid);

        return res;
    },


    async success(orderId: string, pg_token: string): Promise<any> {
        const tid = tidStore.get(orderId);
        console.log("tid", tid);
        const params = {
            cid: process.env.KAKAO_CID,
            tid: tid,
            partner_order_id: orderId,
            partner_user_id: user_id,
            pg_token: pg_token
        };

        const response = await axios.post(
            "https://kapi.kakao.com/v1/payment/approve",
            qs.stringify(params), // ⭐ 중요 (form 형태)
            {
                headers: {
                    Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
                }
            }
        );

        return response.data;
    }
}

