import { User } from "@/types/domain/user";

export type UserResponse = Omit<User, "password">;