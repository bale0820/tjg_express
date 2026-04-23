import { loginRepository } from "@/repository/loginRepository";
import { User } from "@/types/domain/user";
import { SocialLogin } from "@/types/dto/socialLogin";
import { UserResponse } from "@/types/dto/userResponse";
import * as bcrypt from "bcrypt";
export const loginService = {
    login: async (userId: string, password: string): Promise<User | null> => {
        const user = await loginRepository.findByUserId(userId);
        if (user === null) {
            return null;
        }
        if (!user.password) {
            throw new Error("Password required");
        };

        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    },

    findById: async (id: number): Promise<UserResponse | null> => {
        const user = await loginRepository.findById(id);
        return user;
    },

    findUserById: async (userId: string): Promise<boolean> => {
        const user = await loginRepository.findByUserId(userId);
        return user !== null;
    },

    signup: async (user: User): Promise<boolean> => {
        if (!user.password) {
            throw new Error("Password required");
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        user.recommendation = user.recommendation === "" ? null : user.recommendation;
        const result = await loginRepository.save(user);
        return result;
    },
    findByUserEmail: async (userEmail: string): Promise<User> => {
        return await loginRepository.findByUserEmail(userEmail);
    },

    signupSocial: async (socialUser: SocialLogin): Promise<User | null> => {

        const user: User = {
            userId: socialUser.userEmail,
            email: socialUser.userEmail,
            name: socialUser.name,

            password: "",        // ⭐ or random값
            provider: socialUser.provider,

            phone: null,
            gender: null,
            birthday: null,
            address: null,
            recommendation: null,
            zonecode: null,

            role: "USER"
        };
        const result = await loginRepository.saveSocial(user);
        if(result) {
            return await loginRepository.findByUserEmail(socialUser.userEmail);
        }
        return null;
    },
};