// import { RowDataPacket } from "mysql2";

// export interface CartRow extends RowDataPacket {
//   cid: number;
//   qty: number;

//   product: {
//     productName: string;
//     imageUrl: string;
//     price: number;
//     dc: number;
//     count : number;
//   };
// }

import { RowDataPacket } from "mysql2";

export interface CartRow extends RowDataPacket {
  cid: number;
  qty: number;

  image_url: string;
  product_name: string;
  price: number;
  dc: number;
  count: number;
}