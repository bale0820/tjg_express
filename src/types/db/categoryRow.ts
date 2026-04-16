import { RowDataPacket } from "mysql2";

export interface CategoryRow extends RowDataPacket {
  main_id: number;
  main_name: string;
  sub_id: number | null;
  sub_name: string | null;
};