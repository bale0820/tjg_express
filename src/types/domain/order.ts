import { DeliveryStatus } from "./deliveryStatus";
import { OrderDetail } from "./orderDetail";

export interface Order {
  id: number;
  address1: string;
  address2: string;

  deliveredAt?: Date | null;
  deliveryStatus?: DeliveryStatus | null;
  discountAmount: number;
  eta?: Date | null;
  memo: string;
  odate: Date;
  orderCode: string; // UUID
  receiverName: string;
  receiverPhone: string;
  shippingAt?: Date | null;
  shippingFee: number;
  tid?: string | null;
  totalAmount: number;
  upk: number;


  zipcode: string;



  orderDetails: OrderDetail[];
}