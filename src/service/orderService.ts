import { orderRepository } from "@/repository/orderRepository";
import { Order } from "@/types/domain/order";


export const orderService = {
    getOrdersByUser : async(id : number ) : Promise<Order[]>=> {
        return await orderRepository.findAllWithDetailsByUpk(id);

    }


}