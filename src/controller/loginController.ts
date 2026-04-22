/// <reference path="../types/express.d.ts" />
import { authService } from "@/service/authService";
import { loginService } from "@/service/loginService";
import { jwtUtil } from "@/util/jwt-util";
import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export const loginController = {
    login: async (req: Request, res: Response, next: NextFunction
    ) => {
        const { userId, password } = req.body;
        try {
            const user = await loginService.login(userId, password);
            if (user === null) {
                return res.status(401).json({ error: "Invalid credentials" });
            };

            const id = user.id;
            const accessToken = jwtUtil.generateAccessToken(id);
            const refreshToken = await authService.createRefreshToken(id);
            const csrfToken = crypto.randomUUID();

            res.cookie("refresh_token", refreshToken.token, {
                httpOnly: true,
                secure: true,        // HTTPS에서만 전송
                path: "/",
                maxAge: 60 * 1000, // ms 단위
                sameSite: "none"     // 대소문자 중요 (Express는 소문자)
            });

            res.cookie("XSRF-TOKEN", csrfToken, {
                httpOnly: false,
                secure: true,        // HTTPS에서만 전송
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000, // ms 단위
                sameSite: "none"     // 대소문자 중요 (Express는 소문자)
            });

            res.cookie("role", user.role, {
                httpOnly: false,
                secure: true,        // HTTPS에서만 전송
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000, // ms 단위
                sameSite: "none"     // 대소문자 중요 (Express는 소문자)
            });

            res.json({
                accessToken,
                role: user.role
            });


        } catch (err) {
            next(err);
        }

    },

    refresh: async (req: Request, res: Response, next: NextFunction) => {

        const refreshToken = req.cookies["refresh_token"];
        const csrfCookie = req.cookies["XSRF-TOKEN"];
        const csrfHeader = req.header("X-XSRF-TOKEN");
        if (!refreshToken) {
            return res.status(401).json({ error: "No refresh token" });
        }

        if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
            return res.status(403).json({ error: "CSRF mismatch" });
        }
        const newRefresh = await authService.verifyRefreshToken(refreshToken);


        if (newRefresh === null) {
            return res.status(401).json({ error: "Invalid or expired refresh token" });
        }
        const userId = newRefresh.userId;
        const newAccessToken = jwtUtil.generateAccessToken(userId);

        res.cookie("refresh_token", newRefresh.token, {
            httpOnly: true,
            secure: true,        // HTTPS에서만 전송
            path: "/",
            maxAge: 60 * 1000, // ms 단위
            sameSite: "none"     // 대소문자 중요 (Express는 소문자)
        });

        const csrfToken = crypto.randomUUID();

        res.cookie("XSRF-TOKEN", csrfToken, {
            httpOnly: false,
            secure: true,        // HTTPS에서만 전송
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // ms 단위
            sameSite: "none"     // 대소문자 중요 (Express는 소문자)
        });

        return res.json({
            accessToken: newAccessToken
        });



    },

    logout: async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies["refresh_token"];

        res.cookie("refresh_token", "", {
            httpOnly: true,
            secure: true,        // HTTPS에서만 전송
            path: "/",
            maxAge: 0, // ms 단위
            sameSite: "none"     // 대소문자 중요 (Express는 소문자)
        });

        res.cookie("role", "", {
            httpOnly: true,
            secure: true,        // HTTPS에서만 전송
            path: "/",
            maxAge: 0, // ms 단위
            sameSite: "none"     // 대소문자 중요 (Express는 소문자)
        });

        if (token) {
            await authService.verifyTokenAndDelete(token);
        }



        return res.status(200).json({ message: "Logged out" });
    },


    findUserById: async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const id = req.user.id;

        loginService.findById(id);

    },

    findUserIdById: async (req: Request, res: Response, next: NextFunction) => {

        const { userId } = req.body;
        console.log(userId);

        const result = await loginService.findUserById(userId);
        return res.json(result);

    },

    signup: async (req: Request, res: Response, next: NextFunction) => {

        const user = req.body;

        const result = await loginService.signup(user);
        return res.json(result);

    },
};