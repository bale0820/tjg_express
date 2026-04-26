import { analyticsRepository } from "@/repository/analyticRepository";
import { ConversionRateDto } from "@/types/dto/ConversionRateDto";

export const analyticsService = {
    getConversionRates: async (): Promise<ConversionRateDto[]> => {
        const data = await analyticsRepository.findAll();

        return data;
    }
};
