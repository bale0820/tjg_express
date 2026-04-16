import { UserViewLog } from "@/types/domain/userViewLog";
import { promisePool as db } from "../config/db";
import { Advertise } from "../types/domain/advertise";
import { UserViewLogRow } from "@/types/db/userViewLogRow";
import { toCamel } from "@/util/tocamel";
import { ResultSetHeader } from "mysql2";


export const userViewLogRepository = {
    findByUpkAndPpk: async (ppk: number, upk: number): Promise<UserViewLog | null> => {
        const [rows] = await db.query<UserViewLogRow[]>(
            `select * from user_view_log where ppk = ? and upk = ?`,
            [ppk, upk]
        );

        if (rows.length === 0) return null;

        return toCamel<UserViewLog>(rows[0]);
    },


    update: async (data: UserViewLog): Promise<boolean> => {
        const [result] = await db.query<ResultSetHeader>(
            `UPDATE user_view_log 
         SET qty = ?, viewed_at = ? 
         WHERE id = ?`,
            [data.qty, data.viewedAt, data.id]
        );

        return result.affectedRows === 1;
    },

}
