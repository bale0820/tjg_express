import { toCamel } from "@/util/tocamel";
import { promisePool as db } from "../config/db";
import { Advertise } from "../types/domain/advertise";
import { AdvertiseRow } from "@/types/db/advertiseRow";


export const advertiseRepository = {
    findAll :  async() : Promise<Advertise[]> => {
    const [rows] = await db.query<AdvertiseRow[]>(`select * from advertise`);
    
    return rows.map((item : AdvertiseRow) => toCamel<Advertise>(item)) as Advertise[];
}
}
