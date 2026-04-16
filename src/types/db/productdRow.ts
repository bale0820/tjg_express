import { RowDataPacket } from "mysql2";

export interface ProductRow extends RowDataPacket {
    id : number,
    allergy_info : string,
    brand_name : string,
    count : number,
    dc : number,
    del_type : number,
    description : string,
    image_url : string,
    image_url_name : string,
    is_hot_deal : boolean,
    is_member_special : boolean,
    notes : string,
    origin : string,
    pid : string,
    price : number,
    product_date : Date,
    product_description_image : string,
    product_information_image : string,
    product_name : string,
    seller : string,
    unit : string,
    weight : string,
    category_sub_id : number,
    upk : number
}