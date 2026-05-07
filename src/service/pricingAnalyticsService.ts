import { orderRepository } from "@/repository/orderRepository";
import { productRepository } from "@/repository/productRepository"
import { userViewLogRepository } from "@/repository/userViewLogRepository";
import { ProductPricingStatsDto } from "@/types/dto/productPricingStatsDto";


type Input = {
  id: number;
  productName: string;
  currentPrice: number | string;
  clicks: number | string;
  orders: number | string;
};

export const buildProductPricingStats = (
  input: Input
): ProductPricingStatsDto => {
  // 👉 mysql2 때문에 string 가능 → Number 변환
  const currentPrice = Number(input.currentPrice);
  const clicks = Number(input.clicks);
  const orders = Number(input.orders);

  // -------- 기본 지표 --------
  const conversionRate =
    clicks === 0 ? 0 : (orders * 100.0) / clicks;

  const priceSensitivity =
    currentPrice === 0 ? 0 : conversionRate / currentPrice;

  const discountRate = 0.05;
  const aiLowerPrice = Math.floor(currentPrice * (1 - discountRate));

  // -------- AI 예측 --------
  const predictedConversionRate =
    conversionRate * (1 + priceSensitivity * discountRate * 1000);

  const aiClickRate =
    predictedConversionRate + clicks * priceSensitivity * 0.1;

  const predictedOrders =
    clicks * (predictedConversionRate / 100.0);

  // -------- 매출 --------
  const currentRevenue = orders * currentPrice;
  const predictedRevenue = predictedOrders * aiLowerPrice;

  const revenueGain = predictedRevenue - currentRevenue;

  const revenueGainPercent =
    currentRevenue === 0 ? 0 : (revenueGain / currentRevenue) * 100;

  // -------- 경제 지표 --------
  const ped = priceSensitivity * 100;

  const optimalPrice =
    ped === -1 ? currentPrice : (ped / (ped + 1)) * currentPrice;

  // -------- DTO 반환 --------
  return {
    ppk: input.id,
    productName: input.productName,
    currentPrice,

    clicks,
    orders,
    conversionRate,

    aiLowerPrice,
    aiConversionRate: predictedConversionRate,
    aiClickRate,

    priceSensitivity,
    predictedOrders,
    currentRevenue,
    predictedRevenue,
    revenueGain,
    revenueGainPercent,
    ped,
    optimalPrice,
  };
};


export const pricingAnalyticsService = {
  getAllStats: async (): Promise<ProductPricingStatsDto[]> => {
    const products = await productRepository.findAll();

    const result = await Promise.all(
      products.map(async (item) => {
        const [clicks, orders] = await Promise.all([
          userViewLogRepository.sumViewsByProduct(item.id),
          orderRepository.countOrdersByProduct(item.id),
        ]);

        return buildProductPricingStats({
          id: item.id,
          productName: item.productName,
          currentPrice: item.price,
          clicks,
          orders,
        });
      })
    );

    return result;
  },


  getStats: async (ppk: string): Promise<ProductPricingStatsDto> => {
    const product = await productRepository.findById(ppk);

    const [clicks, orders] = await Promise.all([
   userViewLogRepository.sumViewsByProduct(product.id),
   orderRepository.countOrdersByProduct(product.id)
 ]);

    return buildProductPricingStats({
      id: product.id,
      productName: product.productName,
      currentPrice: product.price,
      clicks,
      orders,
    });
     
  
  },
};