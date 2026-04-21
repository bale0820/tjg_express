import { orderService } from "@/service/orderService";
import { NextFunction, Request, Response } from "express";

export const orderController = {
  getMyOrders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const id = req.user.id;

      const data = await orderService.getOrdersByUser(id);

      return res.json(data);

    } catch (err) {
      next(err); // 👉 에러 미들웨어로 넘김
    }
  }
};