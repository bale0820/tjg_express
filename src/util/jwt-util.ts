import jwt from "jsonwebtoken";


const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET 없음");
}

// ✅ AccessToken: 10분
const ACCESS_TOKEN_EXPIRE = "10m";

export const jwtUtil = {

  // ✅ 토큰 생성
  generateAccessToken(userId: number): string {
    return jwt.sign(
      { id: userId },   // payload
      SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRE
      }
    );
  },

  // ✅ 토큰에서 userId 추출
  extractUserId(token: string): number {
    const decoded = jwt.verify(token, SECRET) as { id: number };
    return decoded.id;
  },

  // ✅ 토큰 검증
  validateToken(token: string): boolean {
    try {
      jwt.verify(token, SECRET);
      return true;
    } catch (err: any) {

      if (err.name === "TokenExpiredError") {
        console.log("❌ JWT expired:", err.message);
      } else if (err.name === "JsonWebTokenError") {
        console.log("❌ JWT invalid:", err.message);
      } else {
        console.log("❌ JWT error:", err.message);
      }

      return false;
    }
  }
};