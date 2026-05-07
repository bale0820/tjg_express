import { toCamel } from "@/util/tocamel";
import { promisePool as db } from "../config/db";
import { ConversionRateDto } from "@/types/dto/ConversionRateDto";
import { ConversionRateRow } from "@/types/db/ConversionRateRow";

export const analyticsRepository = {
    findAll: async (): Promise<ConversionRateDto[]> => {
        const [rows] = await db.query<ConversionRateRow[]>(`  SELECT 
  p.id,
  p.product_name,
  COALESCE(v.view_count, 0) AS clicks,
  COALESCE(o.order_count, 0) AS orders
FROM product p
LEFT JOIN (
  SELECT ppk, SUM(qty) AS view_count
  FROM user_view_log
  GROUP BY ppk
) v ON v.ppk = p.id
LEFT JOIN (
  SELECT ppk, SUM(qty) AS order_count
  FROM order_detail
  GROUP BY ppk
) o ON o.ppk = p.id;`);

        return rows.map((item: ConversionRateRow) => {
            const dto = toCamel<ConversionRateDto>(item);
            dto.clicks = Number(dto.clicks);
            dto.orders = Number(dto.orders);
            return {
                ...dto,
                conversionRate:
                    dto.clicks === 0 ? 0 : (dto.orders * 100.0) / dto.clicks,
            };
        });
    }
}
