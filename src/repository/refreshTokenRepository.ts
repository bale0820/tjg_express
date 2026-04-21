import { RefreshToken } from "@/types/domain/refreshToken";
import { ResultSetHeader } from "mysql2";
import { promisePool as db } from "../config/db";
import { RefreshTokenRow } from "@/types/db/refreshTokenRow";
import { toCamel } from "@/util/tocamel";
export const refreshTokenRepository = {
    save : async (data : RefreshToken): Promise<boolean> => {
        const [rows] = await db.query<ResultSetHeader>(`insert into refresh_tokens(user_id, token, expiry_date)  values(?,?,?)`, [data.userId, data.token, data.expiryDate]);

        return rows.affectedRows > 0 ;
    },

    findByToken : async(refreshToken : string) : Promise<RefreshToken | null> => {
        const [rows] = await db.query<RefreshTokenRow[]>(`select * from refresh_tokens where token = ?`, [refreshToken]);
          if (rows.length === 0) return null;
        return toCamel<RefreshToken>(rows[0]);
    },
    deleteByUserId : async(userId : number)  : Promise<boolean> => {
        const [rows] = await db.query<ResultSetHeader>(`delete from refresh_tokens where user_id = ?`,[userId]);
        return rows.affectedRows > 0;
    }
}
