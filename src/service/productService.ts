// import * as productRepository from '../repository/productRepository';

import { Product } from '@/types/domain/product';
import { productRepository } from '../repository/productRepository';
import { toCamel } from '../util/tocamel';
import { ProductDetail } from '@/types/domain/productDetail';

export const productService = {
    getProductList: async (): Promise<Product[]> => {
        const data = await productRepository.findAll();
        return data as Product[];
    },
    getProductDetail: async (id : string): Promise<ProductDetail> => {
        const data = await productRepository.findProductDetailById(id);
        return data;
    }
};
