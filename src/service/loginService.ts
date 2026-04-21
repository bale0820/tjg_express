import { loginRepository } from "@/repository/loginRepository";
import { User } from "@/types/domain/user";
import { UserResponse } from "@/types/dto/userResponse";
import bcrypt from "bcrypt";
export const loginService = {
    login: async (userId: string, password: string): Promise<User | null> => {
        const user = await loginRepository.findByUserId(userId);

        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    },

    findById : async (id: number): Promise<UserResponse | null> => {
        const user = await loginRepository.findById(id);
        return user;
    },
};