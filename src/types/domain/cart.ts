import { RowDataPacket } from "mysql2";


export interface Cart {
  cid: number;
  qty: number;

  product: {
    productName: string;
    imageUrl: string;
    price: number;
    dc: number;
    count : number;
  };
}
