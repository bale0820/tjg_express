
import { userViewLogRepository } from "@/repository/userViewLogRepository";
import { toCamel } from "../util/tocamel";


export const viewService = {
    saveViewLog : async (upk : number ,ppk : number, categorySubId : number): Promise<boolean> => {
        let result = false;
        const data = await userViewLogRepository.findByUpkAndPpk(upk, ppk);

        if(!!data) {
            data.qty ++;
            data.viewedAt = new Date();
            userViewLogRepository.update(data);
            result = true;
        }; 


        return result;
    },
};
