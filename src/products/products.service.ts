import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'helpers/page/page';
import { ProductsRequestDto } from './dtos/products.request.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { Rectable } from './rectable.entity';
import { RectableRepository } from './rectable.repository';

// 유저가 구매했던 기반으로 -> score 상위 20개
// 이벤트가 참여했던 이력도 함께 추가
@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: ProductRepository,
        @InjectRepository(Rectable) private readonly rectableRepository: RectableRepository,
    ) {}

    async getRecommendationProducts(query: ProductsRequestDto) {
        const limit = Page.getLimit(query.limit);
        const offset = Page.getOffset(query.page, query.limit);
        const filter = parseInt(query.filter);


        let topProducts;
        if(filter) {
            topProducts = await this.productRepository.createQueryBuilder()
            .select([ 'product_idx, department_idx, product_name, product_img, order_number'])
            .where('order_number >= 0 and department_idx in (:filter)', { filter })
            .orderBy('order_number', 'DESC')
            .limit(limit)
            .offset(offset)
            .getRawMany();

        } else {

            topProducts = await this.productRepository.createQueryBuilder()
            .select([ 'product_idx, department_idx, product_name, product_img, order_number'])
            .where('order_number >= 0')
            .orderBy('order_number', 'DESC')
            .limit(limit)
            .offset(offset)
            .getRawMany();
        }
   

        return {
            isSuccess: true,
            statusCode: 200,
            message: '[헤더] 추천 상품 Top 리스트 조회 성공',
            data: topProducts
        };
    }

    async getRecommendationProductsFromPurchase(query: ProductsRequestDto) {
        const limit = Page.getLimit(query.limit);
        const offset = Page.getOffset(query.page, query.limit);
        const filter = parseInt(query.filter);

        let products;
        if(filter) {
            products = await this.rectableRepository.createQueryBuilder('rectable')
            .select(['rectable_idx, rectable.product_idx, score, department_idx, product_name, product_img'])
            .where('product.department_idx in (:filter)', { filter })
            .leftJoin(Product, 'product', 'product.product_idx = rectable.product_idx')
            .orderBy('score', 'DESC')
            .limit(limit)
            .offset(offset)
            .getRawMany();

        } else {

            products = await this.rectableRepository.createQueryBuilder('rectable')
            .select(['rectable_idx, rectable.product_idx, score, department_idx, product_name, product_img'])
            .leftJoin(Product, 'product', 'product.product_idx = rectable.product_idx')
            .orderBy('score', 'DESC')
            .limit(limit)
            .offset(offset)
            .getRawMany();
        }

        return {
            isSuccess: true,
            statusCode: 200,
            message: '구매 이력 기반 추천 상품 리스트 조회 성공',
            data: products
        };
    }

    async getRecommendationProductsFromEvent(userIdx: number, query: ProductsRequestDto) {
        const limit = Page.getLimit(query.limit);
        const offset = Page.getOffset(query.page, query.limit);
        const filter = parseInt(query.filter);

        let products;

        if(filter) {
            products = await this.rectableRepository.createQueryBuilder('rectable')
            .select([''])
            .where('product.department_idx in (:filter)', { filter })
            .leftJoin(Product, 'product', 'product.product_idx = rectable.product_idx')
            .orderBy('score', 'DESC')
            .limit(limit)
            .offset(offset)
            .getRawMany();

        } else {

            products = await this.rectableRepository.createQueryBuilder('rectable')
            .select(['rectable_idx, rectable.product_idx, score, department_idx, product_name, product_img'])
            .leftJoin(Product, 'product', 'product.product_idx = rectable.product_idx')
            .orderBy('score', 'DESC')
            .limit(limit)
            .offset(offset)
            .getRawMany();
        }

        return {
            isSuccess: true,
            statusCode: 200,
            message: '[테스트 후] 추천 상품 리스트 조회 성공',
            data: products
        };
    }

}
