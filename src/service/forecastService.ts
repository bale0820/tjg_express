import { couponRepository } from "@/repository/couponRepository";
import { orderRepository } from "@/repository/orderRepository";
import { UserCoupon } from "@/types/domain/UserCoupon";
import { DailySalesDto } from "@/types/dto/dailySalesDto";
import { ForecastResponseDto } from "@/types/dto/ForecastResponseDto";
import { askOpenAI } from "@/util/askOpenAI";
import { safeList } from "@/util/safeList";

export const forecastService = {
    getDailySales: async (ppk: string): Promise<DailySalesDto[]> => {
        const data = await orderRepository.findDailySalesByProduct(ppk);
        const result = data.map((item) => {
            return {
                dateTime: item.odate,
                qty: item.qty
            }
        }
        );
        return result;
    },

    runForecast: async (ppk: string): Promise<ForecastResponseDto> => {
        const sales = await forecastService.getDailySales(ppk);
        const lines: string[] = [];

        lines.push("다음은 최근 일별 판매량 데이터이다. '날짜=수량' 형식:");

        sales.forEach(s => {
            lines.push(`${s.dateTime}=${s.qty}`);
        });

        lines.push(`
설명 금지. 코드블록 금지. JSON만 출력.
반드시 아래 형식 그대로 출력해.
{
  "next7Days": [7개 정수],
  "next30Days": [30개 정수],
  "next12Months": [12개 정수],
  "next365Days": [365개 정수]
}
모든 배열은 정확한 개수의 정수만 포함해야 한다.
`);

        const prompt = lines.join("\n");


        const raw = await askOpenAI(prompt);

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (e) {
            throw new Error("AI 응답 JSON 파싱 실패");
        }

        return {
            next7Days: safeList(parsed.next7Days, 7),
            next30Days: safeList(parsed.next30Days, 30),
            next12Months: safeList(parsed.next12Months, 12),
            next365Days: safeList(parsed.next365Days, 365)
        };


    }


};