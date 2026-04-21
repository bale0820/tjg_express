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
// const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/product', productRoutes);
app.use('/advertise', advertiseRoutes);
app.use('/category', categoryRoutes);
app.use('/view', viewRoutes);
app.use('/auth', loginRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(500).json({
        success: false,
        messsage: 'SERVER ERROR'
    });

});


app.listen(8080, () => { console.log('server running'); });