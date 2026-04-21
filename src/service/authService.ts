import { refreshTokenRepository } from "@/repository/refreshTokenRepository";
import { RefreshToken } from "@/types/domain/refreshToken";
import crypto, { verify } from "crypto";


export const authService = {
  async createRefreshToken(userId: number): Promise<RefreshToken> {

    const rawToken = crypto.randomUUID();

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const entity = {
      userId,
      token: hashedToken,
      expiryDate
    };

    const result = await refreshTokenRepository.save(entity);

    if (!result) {
      throw new Error("refreshToken not saved");
    }

    return {
      userId,
      token: rawToken, // 클라이언트용
      expiryDate
    };
  },


  async verifyTokenAndDelete(refreshToken: string): Promise<boolean> {
    const hashed = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const oldToken = await refreshTokenRepository.findByToken(hashed);
    if (!oldToken) {
      return false;
    }
    const userId = oldToken.userId;
    return refreshTokenRepository.deleteByUserId(userId);
  },

  async verifyRefreshToken(refreshToken: string): Promise<RefreshToken | null> {
    const hashed = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const oldToken = await refreshTokenRepository.findByToken(hashed);

    if (!oldToken) {
      return null; // ❌ throw 말고 이게 맞다
    }
    const userId = oldToken.userId;
    refreshTokenRepository.deleteByUserId(userId);
    if (new Date(oldToken.expiryDate).getTime() < Date.now()) {
      return null;
    }
    const newToken = await this.createRefreshToken(userId);
    return newToken;
  }
};