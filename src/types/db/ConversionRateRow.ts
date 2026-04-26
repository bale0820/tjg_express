import { RowDataPacket } from "mysql2";

export interface ConversionRateRow extends RowDataPacket {
    ppk : number;
    product_name : string;
    clicks : number;
    orders : number;
}