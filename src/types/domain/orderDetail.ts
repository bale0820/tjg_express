export interface OrderDetail {
  id?: number;
  ppk : number;
  price : number;
  productName : string;
  qty: number;
  orderId?: number;
  product?: {
    imageUrl : string;
    count : number;
  }
  
}