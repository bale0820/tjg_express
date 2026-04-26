// import { loginService } from "@/service/loginService";
// import { jwtUtil } from "@/util/jwt-util";
// import axios from "axios";
// import { NextFunction, Request, Response } from "express";

// export const socialLoginController = {

//     loginNaver: (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const baseUrl = process.env.baseUrl;
//             const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID!;
//             const REDIRECT_URI = `${baseUrl}/oauth2/naver/callback`

//             const state = Math.random().toString(36).substring(2); // 간단 state
//             // (실무: 세션/쿠키에 저장해서 검증)

//             const url = `https://nid.naver.com/oauth2.0/authorize` +
//                 `?response_type=code` +
//                 `&client_id=${NAVER_CLIENT_ID}` +
//                 `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
//                 `&state=${state}`;

//             return res.redirect(url); // ⭐ 여기 중요
//             return res.redirect(url);

//         } catch (err) {

//         }

//     },

//     naverCallback: async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { code, state } = req.query;

//             const tokenRes = await axios.get('https://nid.naver.com/oauth2.0/token', {
//                 params: {
//                     grant_type: 'authorization_code',
//                     client_id: process.env.NAVER_CLIENT_ID,
//                     client_secret: process.env.NAVER_CLIENT_SECRET,
//                     code,
//                     state
//                 }
//             });

//             const accessToken1 = tokenRes.data.access_token;

//             const userRes = await axios.get('https://openapi.naver.com/v1/nid/me', {
//                 headers: {
//                     Authorization: `Bearer ${accessToken1}`
//                 }
//             });

//             const naverUser = userRes.data.response;

//             const userEmail = naverUser.email;
//             const name = naverUser.name;

//             // ✔ 이미 있으면 로그인
//             let user = await loginService.findByUserEmail(userEmail);

//             let result;

//             if (!user) {
//                 // ✔ 없으면 회원가입
//                 result = await loginService.signupSocial({
//                     userEmail,
//                     name,
//                     provider: "naver"
//                 });
//             }


//                 const frontendUrl = process.env.FRONTEND_URL; // 예: http://localhost:3000
//                 const id = result? result.id : user.id;
//                 const accessToken = jwtUtil.generateAccessToken(id);
//                 export const oauthSuccess = async (req: Request, res: Response) => {
//                     const accessToken = "토큰값";
//                     const provider = "kakao";
//                     const userId = 1;

//                     const redirectUrl = `${frontendUrl}/oauth/success?accessToken=${accessToken}&provider=${provider}&userId=${userId}&success=200`;

//                     return res.redirect(redirectUrl);



//             }


//         } catch (err) {
//             next(err);
//         }

//     },



// }

import { loginService } from "@/service/loginService";
import { jwtUtil } from "@/util/jwt-util";
import axios from "axios";
import { NextFunction, Request, Response } from "express";

export const socialLoginController = {

    loginNaver: (req: Request, res: Response, next: NextFunction) => {
        try {
            const baseUrl = process.env.baseUrl;
            const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID!;
            const REDIRECT_URI = `${baseUrl}/oauth2/naver/callback`;
            const state = Math.random().toString(36).substring(2);

            const url = `https://nid.naver.com/oauth2.0/authorize` +
                `?response_type=code` +
                `&client_id=${NAVER_CLIENT_ID}` +
                `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
                `&state=${state}`;

            return res.redirect(url);

        } catch (err) {
            next(err);
        }
    },

    naverCallback: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code, state } = req.query;

            // 1️⃣ 토큰 받기
            const tokenRes = await axios.get('https://nid.naver.com/oauth2.0/token', {
                params: {
                    grant_type: 'authorization_code',
                    client_id: process.env.NAVER_CLIENT_ID,
                    client_secret: process.env.NAVER_CLIENT_SECRET,
                    code,
                    state
                }
            });
            const data1 = tokenRes.data;
            const accessToken1 = data1.access_token;
            // 2️⃣ 유저 정보 가져오기
            const userRes = await axios.get('https://openapi.naver.com/v1/nid/me', {
                headers: {
                    Authorization: `Bearer ${accessToken1}`
                }
            });

            const naverUser = userRes.data.response;

            const userEmail = naverUser.email;
            const name = naverUser.name;
             console.log("userEmail", userEmail);
            // 3️⃣ DB 조회
            let user = await loginService.findByUserEmail(userEmail);
            let id: number;

            if (!user) {
                const result = await loginService.signupSocial({
                    userEmail,
                    name,
                    provider: "naver"
                });

                if (!result) {
                    throw new Error("server error");
                }

                id = result.id as number;
            } else {
                id = user.id as number;
            }

            // 4️⃣ JWT 발급
            const accessToken = jwtUtil.generateAccessToken(id);

            // 5️⃣ 프론트로 리다이렉트
            const frontendUrl = process.env.FRONTEND_URL;

            const params = new URLSearchParams({
                accessToken,
                provider: "naver",
                userId: String(id),
                success: "200"
            });

            return res.redirect(`${frontendUrl}/oauth/success?${params.toString()}`);

        } catch (err) {
            next(err);
        }
    },


    // 1️⃣ 카카오 로그인 요청
    loginKakao: (req: Request, res: Response) => {
        const baseUrl = process.env.baseUrl!;
        const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID!;
        const REDIRECT_URI = `${baseUrl}/oauth2/kakao/callback`;

        const url = `https://kauth.kakao.com/oauth/authorize` +
            `?response_type=code` +
            `&client_id=${KAKAO_CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

        return res.redirect(url);
    },

    // 2️⃣ 콜백
    kakaoCallback: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const code = req.query.code as string;
            console.log("여기");
            // 🔥 1. 토큰 요청
            const tokenRes = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                null,
                {
                    params: {
                        grant_type: "authorization_code",
                        client_id: process.env.KAKAO_CLIENT_ID,
                        // client_secret: process.env.KAKAO_CLIENT_SECRET,
                        redirect_uri: `${process.env.baseUrl}/oauth2/kakao/callback`,
                        code
                    }
                }
            );

            const accessToken1 = tokenRes.data.access_token;

            // 🔥 2. 유저 정보 요청
            const userRes = await axios.get(
                "https://kapi.kakao.com/v2/user/me",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken1}`
                    }
                }
            );

            const kakaoUser = userRes.data;
            console.log("kakaoAccount", kakaoUser);
            const kakaoId = kakaoUser.id;

            // 🔥 3. 데이터 파싱
            const kakaoAccount = kakaoUser.kakao_account;
            const profile = kakaoAccount.profile;

            const userEmail = kakaoAccount.email?  kakaoAccount.email : "kakao_" + kakaoId + "@kakao.local";
            const name = profile.nickname;
            // 🔥 4. DB 조회
            let user = await loginService.findByUserEmail(userEmail);
            let id: number;

             if (!user) {
                const result = await loginService.signupSocial({
                    userEmail,
                    name,
                    provider: "kako"
                });

                if (!result) {
                    throw new Error("server error");
                }

                id = result.id as number;
            } else {
                id = user.id as number;
            }

            // 🔥 5. JWT 발급
            const accessToken = jwtUtil.generateAccessToken(id);

            // 🔥 6. 리다이렉트
            const frontendUrl = process.env.FRONTEND_URL;

            const params = new URLSearchParams({
                accessToken,
                provider: "kakao",
                userId: String(id),
                success: "200"
            });

            return res.redirect(`${frontendUrl}/oauth/success?${params.toString()}`);

        } catch (err) {
            next(err);
        }
    }

};