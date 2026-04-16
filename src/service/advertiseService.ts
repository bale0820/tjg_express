import { Advertise } from '../types/domain/advertise';
import { advertiseRepository } from '../repository/advertiseRepository';


export const advertiseService = {
    getAdvertiseList: async (): Promise<Advertise[]> => {
        const data = await advertiseRepository.findAll();

        return data;
    }
};
