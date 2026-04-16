import { CategoryMain } from "@/types/domain/categoryMain";
import { promisePool as db } from "../config/db";
import { CategoryRow } from "@/types/db/categoryRow";
import { toCamel } from "@/util/tocamel";



export const categoryRepository = {
    findAll: async (): Promise<CategoryMain[]> => {
        const [rows] = await db.query<CategoryRow[]>(`
  SELECT 
    m.id AS main_id,
    m.name AS main_name,
    s.id AS sub_id,
    s.name AS sub_name
  FROM category_main m
  LEFT JOIN category_sub s
  ON m.id = s.main_id
`);
        const result: CategoryMain[] = [];

        const map = new Map();

        rows.forEach(row => {
            if (!map.has(row.main_id)) {
                map.set(row.main_id, {
                    id: row.main_id,
                    name: row.main_name,
                    subCategories: []
                });
                result.push(map.get(row.main_id));
            }

            if (row.sub_id) {
                map.get(row.main_id).subCategories.push({
                    id: row.sub_id,
                    name: row.sub_name
                });
            }
        });

        return result;
    }
}
