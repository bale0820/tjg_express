import { RowDataPacket } from "mysql2";

export interface RefreshTokenRow extends RowDataPacket{
    id : number,
    user_id : number,
    token : string,
    expiry_date : Date
}