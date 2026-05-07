
export interface ProductPricingStatsDto {
  ppk: number;               // 상품 PK
  productName: string;       // 상품명
  currentPrice: number;      // 현재 가격

  // 실측 성능
  clicks: number;            // 클릭수
  orders: number;            // 구매수
  conversionRate: number;    // 실제 전환율 (%)

  // AI 예측
  aiLowerPrice: number;      // AI 추천 가격
  aiConversionRate: number;  // 예측 전환율 (%)
  aiClickRate: number;       // 클릭률 변화 (%)

  // 고급 지표
  priceSensitivity: number;
  predictedOrders: number;
  currentRevenue: number;
  predictedRevenue: number;
  revenueGain: number;
  revenueGainPercent: number;
  ped: number;
  optimalPrice: number;
}