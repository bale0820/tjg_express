import { RowDataPacket } from "mysql2";

export interface DeliveryRow extends RowDataPacket {
    del_type : number;
    del_description : string;
    del_name : string;
} 