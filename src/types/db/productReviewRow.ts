import { RowDataPacket } from "mysql2";

export interface productReviewRow extends RowDataPacket {
    id: number;
    content: string;
    date: Date;
    images: string;       // JSON or comma string일 가능성 있음
    is_best: number;      // tinyint → number
    likes: number;
    ppk: number;
    product_name: string;
    tags: string;         // JSON or 문자열
    title: string;
    upk: number;
    name: string;         // users.name
}