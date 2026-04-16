import { RowDataPacket } from "mysql2";

export interface UserViewLogRow  extends RowDataPacket {
  id: number;
  upk: number;
  ppk: number;
  sub_category_id: number;
  viewed_at: Date;
  qty: number;
}