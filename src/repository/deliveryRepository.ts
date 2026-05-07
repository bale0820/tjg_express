import { Delivery } from "@/types/domain/delivery";
import { promisePool as db } from "../config/db";
import { DeliveryRow } from "@/types/db/deliveryRow";
import { toCamel } from "@/util/tocamel";

export const deliveryRepository = {
    findAll : async() : Promise<Delivery[]> => {
        const [rows] = await db.query<DeliveryRow[]>("select * from delivery");

        const result = rows.map((row)=> toCamel<Delivery>(row));
        return result;
    }

}