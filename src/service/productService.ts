// import * as productRepository from '../repository/productRepository';

import { Product } from '@/types/domain/product';
import { productRepository } from '../repository/productRepository';
import { toCamel } from '../util/tocamel';
import { ProductDetail } from '@/types/domain/productDetail';
import { ProductWithCategory } from '@/types/domain/ProductWithCategory';

export const productService = {
    getProductList: async (): Promise<ProductWithCategory[]> => {
        const data = await productRepository.findAll();
        return data;
    },
    getProductDetail: async (id : string): Promise<ProductDetail> => {
        const data = await productRepository.findProductDetailById(id);
        return data;
    }
};
