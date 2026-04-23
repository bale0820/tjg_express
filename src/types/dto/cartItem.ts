import { RowDataPacket } from "mysql2";


export interface Cartitem {
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
