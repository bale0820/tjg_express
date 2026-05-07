// import * as productRepository from '../repository/productRepository';

import { Product } from '@/types/domain/product';
import { productRepository } from '../repository/productRepository';
import { toCamel } from '../util/tocamel';
import { ProductDetail } from '@/types/domain/productDetail';
import { ProductWithCategory } from '@/types/domain/ProductWithCategory';
import { ProductReview } from '@/types/domain/productReview';
import { s3Service } from '@/util/s3Service';
import { stringify } from 'qs';


const PRODUCT_IMAGES = 0;
const PRODUCT_INFORMATION = 1;
const PRODUCT_DESCRIPTION = 2;

export const productService = {
    getProductList: async (): Promise<ProductWithCategory[]> => {
        const data = await productRepository.findAll();
        return data;
    },
    getProductDetail: async (id: string): Promise<ProductDetail> => {
        const data = await productRepository.findProductDetailById(id);
        return data;
    },


    getProductRevieList: async (): Promise<ProductReview[]> => {
        const data = await productRepository.findAllReviewWithUserName();
        return data;
    },

    saveProduct: async (product: ProductWithCategory, files: Express.Multer.File[]): Promise<boolean> => {

        for (let i = 0; i < files.length; i++) {
            productService.setImages(product, files[i], i);
        }

        product.hotDeal = product.dc !== 0;
        if (!product.memberSpecial) {
            product.memberSpecial = false;
        }
        const createdAt = new Date();
        product.productDate = createdAt;
        const result = await productRepository.save(product);
        if (result) {
            return true;
        } else {
            return false;
        }
    },



    setImages: async (product: Product, file: Express.Multer.File, idx: number): Promise<void> => {
        let s3Dir;

        switch (idx) {
            case PRODUCT_IMAGES:
                s3Dir = "productImages";
                product.imageUrl = file.filename;
                product.imageUrlName = file.filename;
                break;

            case PRODUCT_INFORMATION:
                s3Dir = "productInformation";
                product.productInformationImage = file.filename;
                break;

            case PRODUCT_DESCRIPTION:
                s3Dir = "productDescription";
                product.productDescriptionImage = file.filename;
                break;

            default:
                throw new Error("Unexpected value: " + idx);
        }


        s3Service.upload(file, s3Dir);
    },

    deleteImagesAndUpdateImages: async (oldProduct: ProductDetail, newProduct : ProductWithCategory, file: Express.Multer.File, idx: number): Promise<void> => {
        let s3Dir;
        let oldImage;
        switch (idx) {
            case PRODUCT_IMAGES:
                s3Dir = "productImages";
                oldImage = oldProduct.imageUrl;
                newProduct.imageUrl = file.filename;
                newProduct.imageUrlName = file.filename;
                break;

            case PRODUCT_INFORMATION:
                s3Dir = "productInformation";
                oldImage = oldProduct.productInformationImage;
                newProduct.productInformationImage = file.filename;
                break;

            case PRODUCT_DESCRIPTION:
                s3Dir = "productDescription";
                oldImage = oldProduct.productDescriptionImage;
                newProduct.productDescriptionImage = file.filename;
                break;

            default:
                throw new Error("Unexpected value: " + idx);
        }

        if(!!oldImage && !!oldImage.trim()) {
           await  s3Service.delete(oldImage, s3Dir);
        }
        await s3Service.upload(file, s3Dir);
    },


    updateProduct: async(product: ProductWithCategory, files: Express.Multer.File[]) : Promise<boolean> => {

        const id = String(product.id);
        const data = await productRepository.findById(id);

        for (let i = 0; i < files.length; i++) {
            productService.deleteImagesAndUpdateImages(data, product, files[i], i);
        }
        product.hotDeal = product.dc !== 0;
        if (!product.memberSpecial) {
            product.memberSpecial = false;
        }
        const createdAt = new Date();
        product.productDate = createdAt;

       const result =  await productRepository.update(product);
         if (result) {
            return true;
        } else {
            return false;
        }

    }
};
