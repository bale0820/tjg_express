import { orderRepository } from "@/repository/orderRepository";
import { kakaoPayService } from "@/service/kakaoPayService";
import { orderService } from "@/service/orderService";
import { KakaoApproveResponse } from "@/types/dto/kakaoApproveResponse";
import { KakaoPay } from "@/types/dto/KakaoPay";
import { toCamel } from "@/util/tocamel";
import { NextFunction, Request, Response } from "express";

let payInfo: KakaoPay;
const frontendUrl = process.env.FRONTEND_URL;

export const paymentController = {

    ready: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const user_id = req.user.id;
            const kakaoPay: KakaoPay = req.body;
            kakaoPay.id = user_id;

            kakaoPay.orderId = crypto.randomUUID().toString();
            payInfo = kakaoPay;
            const data = await kakaoPayService.ready(kakaoPay);
            res.json(data);

        } catch (err) {
            next(err); // 👉 에러 미들웨어로 넘김
        }
    },

    success: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { orderId, pg_token } = req.query as {
                orderId: string;
                pg_token: string;
            };
            if (!orderId || !pg_token) {
                throw new Error("no orderId or no pg_token");
            }
            const approve = await kakaoPayService.success(orderId, pg_token);
            const convertion = toCamel<KakaoApproveResponse>(approve);
            await orderService.saveOrder(convertion, payInfo);

            const redirectUrl = `${frontendUrl}/payResult?orderId=${orderId}&status=success`;

            res.redirect(redirectUrl);

        } catch (err) {
            next(err);
        }
    }

};