import { analyticsRepository } from "@/repository/analyticRepository";
import { ConversionRateDto } from "@/types/dto/conversionRateDto";

export const analyticsService = {
    getConversionRates: async (): Promise<ConversionRateDto[]> => {
        const data = await analyticsRepository.findAll();

        return data;
    },
};
