import { deliveryRepository } from "@/repository/deliveryRepository";
import { Delivery } from "@/types/domain/delivery";

export const delivertService = {
    getDeliveryList : async() : Promise<Delivery[]>=> {
        const result = await deliveryRepository.findAll();
        return result;
    }


}