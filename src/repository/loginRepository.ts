import { UserRow } from "@/types/db/userRow";
import { promisePool as db } from "../config/db";
import { User } from "@/types/domain/user";
import { toCamel } from "@/util/tocamel";
import { UserResponse } from "@/types/dto/userResponse";

export const loginRepository = {
    findByUserId: async (userId: string): Promise<User> => {
        const [rows] = await db.query<UserRow[]>(`select * from users where user_id = ?`, [userId]);

        return toCamel<User>(rows[0]) as User;
    },

     findById: async (id : number): Promise<UserResponse> => {
        const [rows] = await db.query<UserRow[]>(`select * from users where id = ?`, [id]);

        
        const data = toCamel<User>(rows[0]) as User;
        const { password, ...safeUser } = data;

        return safeUser as UserResponse;


    }
}
