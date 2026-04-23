import { UserRow } from "@/types/db/userRow";
import { promisePool as db } from "../config/db";
import { User } from "@/types/domain/user";
import { toCamel } from "@/util/tocamel";
import { UserResponse } from "@/types/dto/userResponse";
import { ResultSetHeader } from "mysql2";

export const loginRepository = {
    findByUserId: async (userId: string): Promise<User | null> => {
        const [rows] = await db.query<UserRow[]>(`select * from users where user_id = ?`, [userId]);


        const row = rows[0];
        if (!row) return null;

        return toCamel<User>(rows[0]) as User;
    },

    findById: async (id: number): Promise<UserResponse> => {
        const [rows] = await db.query<UserRow[]>(`select * from users where id = ?`, [id]);


        const data = toCamel<User>(rows[0]) as User;
        const { password, ...safeUser } = data;

        return safeUser as UserResponse;


    },

    save : async (user: User): Promise<boolean> => {
        const [rows] = await db.query<ResultSetHeader>(`insert into users(address, birthday, email, gender, name, password, phone, recommendation , user_id, zonecode, role) values(?,?,?,?,?,?,?,?,?,?,?)`,
             [user.address, user.birthday, user.email, user.gender, user.name,user.password, user.phone, user.recommendation, user.userId, user.zonecode, "USER"]);
        return rows.affectedRows > 0;


    },

    findByUserEmail : async (userEmail: string): Promise<User> => {
        const [rows] = await db.query<UserRow[]>(`select * from users where email = ?  `,[userEmail]);
        return toCamel<User>(rows[0]) ;
    },



    saveSocial : async (user: User): Promise<boolean> => {
    const [rows] = await db.query<ResultSetHeader>(
      `
      INSERT INTO users (
        user_id,
        email,
        name,
        password,
        provider,
        phone,
        gender,
        birthday,
        address,
        recommendation,
        zonecode,
        role
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user.userId,
        user.email,
        user.name,
        user.password,
        user.provider,
        user.phone,
        user.gender,
        user.birthday,
        user.address,
        user.recommendation,
        user.zonecode,
        user.role
      ]
    );

    return rows.affectedRows > 0;
  }

}
