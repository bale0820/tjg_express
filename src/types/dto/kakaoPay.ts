import { PaymentInfo } from "./paymentInfo";
import { ProductInfo } from "./productInfo";
import { Receiver } from "./receiver";

export interface KakaoPay {
  orderId?: string;
  id: number;
  itemName: string;
  qty: string;
  totalAmount: string;
  receiver: Receiver;
  paymentInfo: PaymentInfo;
  cidList: number[];
  couponId: number;
  productInfo: ProductInfo[];
}