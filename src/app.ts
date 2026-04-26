import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import { productRoutes } from "./routes/productRoutes";
import { advertiseRoutes } from "./routes/advertiseRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { viewRoutes } from "./routes/viewRoutes";
import { loginRoutes } from "./routes/loginRoutes";
import cookieParser from "cookie-parser";
import { cartRoutes } from "./routes/cartRoutes";
import { orderRoutes } from "./routes/orderRoutes";
import cors from "cors";
import { socialLoginRoutes } from "./routes/socialLoginRoutes";
import { couponRoutes } from "./routes/couponRoutes";
import { paymentRoutes } from "./routes/paymentRoutes";
import { forecastRoutes } from "./routes/forecastRoutes";
import { excelRoutes } from "./routes/excelRoutes";
import { analyticesRoutes } from "./routes/analyticesRoutes";
// const express = require("express");


const app = express();

app.use(cors({
  origin: "http://localhost:3000", // 허용할 프론트 주소
  credentials: true               // 쿠키/인증 허용
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/product', productRoutes);
app.use('/advertise', advertiseRoutes);
app.use('/category', categoryRoutes);
app.use('/view', viewRoutes);
app.use('/auth', loginRoutes);
app.use('/member', loginRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/oauth2', socialLoginRoutes);
app.use('/coupon', couponRoutes);
app.use('/payment', paymentRoutes);
app.use('/payment', paymentRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/excel', excelRoutes);
app.use('/api/analytics', analyticesRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(500).json({
        success: false,
        messsage: 'SERVER ERROR'
    });

});



app.listen(8080, () => { console.log('server running'); });