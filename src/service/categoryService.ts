import { categoryRepository } from "@/repository/categoryRepository";
import { toCamel } from "../util/tocamel";
import { CategoryMain } from "@/types/domain/categoryMain";


export const categoryService = {
    getCategoryList: async (): Promise<CategoryMain[]> => {
        const data = await categoryRepository.findAll();
        

        return data;
    }
};
