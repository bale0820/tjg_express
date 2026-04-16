import { RowDataPacket } from "mysql2";

export interface AdvertiseRow extends RowDataPacket{
  adv_id: number;
  adv_image_banner: string;
  adv_image_inline: string;
  adv_detail_image: string;
  adv_link: string;
  adv_name: string;
}