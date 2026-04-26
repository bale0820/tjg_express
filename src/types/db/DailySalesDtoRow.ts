import { RowDataPacket } from "mysql2";

export interface DailySalesDtoRow extends RowDataPacket {
    odate : Date;
    qty : number;
}