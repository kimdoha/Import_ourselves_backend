import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'helpers/page/page';
import { Event } from 'src/events/event.entity';
import { EventRepository } from 'src/events/event.repository';
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
        @InjectRepository(Event) private eventRepository: EventRepository,
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

    async getRecommendationProductsFromPurchase(userIdx: number, query: ProductsRequestDto) {
        const limit = Page.getLimit(query.limit);
        const offset = Page.getOffset(query.page, query.limit);
        const filter = parseInt(query.filter);

        let products;
        if(filter) {
            products = await this.rectableRepository.createQueryBuilder('rectable')
            .select(['rectable_idx, rectable.user_idx, rectable.product_idx, score, department_idx, product_name, product_img'])
            .where('product.department_idx in (:filter)', { filter })
            .andWhere('rectable.user_idx = :userIdx', { userIdx })
            .leftJoin(Product, 'product', 'product.product_idx = rectable.product_idx')
            .orderBy('score', 'DESC')
            .limit(limit)
            .offset(offset)
            .getRawMany();

        } else {

            products = await this.rectableRepository.createQueryBuilder('rectable')
            .select(['rectable_idx, rectable.user_idx, rectable.product_idx, score, department_idx, product_name, product_img'])
            .where('rectable.user_idx = :userIdx', { userIdx })
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

        const event = await this.eventRepository.createQueryBuilder()
        .select([`ques1, ques2, ques3, ques4, ques5`])
        .where('user_idx = :userIdx', { userIdx })
        .orderBy('created_at', 'DESC')
        .limit(1)
        .getRawOne();

        if(!event) {
        throw new BadRequestException('이벤트 참여 이력이 없습니다.');
        }


        const ques1 = parseInt(event.ques1);
        const n_ques1 = ques1 == 0 ? 1 : 0;

        const ques2 = parseInt(event.ques2);
        const n_ques2 = ques2 == 0 ? 1 : 0;

        const ques3 = parseInt(event.ques3);
        const n_ques3 = ques3 == 0 ? 1 : 0;

        const ques4 = parseInt(event.ques4);
        const n_ques4 = ques4 == 0 ? 1 : 0;

        const ques5 = parseInt(event.ques5);
        const n_ques5 = ques5 == 0 ? 1 : 0;

        if(filter) {

            products = await this.rectableRepository.createQueryBuilder('rectable')
            .select([`score + 
                    ${ques1} * 0.05 * product.hotel +
                    ${n_ques1} * 0.05 * product.camping + 
                    ${ques2} * 0.1 * product.make + 
                    ${n_ques2} * 0.1 * product.instant + 
                    ${ques3} * 0.05 * product.rice_lover + 
                    ${n_ques3} * 0.05 * product.desert_lover + 
                    ${ques4} * 0.15 * product.meat_lover + 
                    ${n_ques4} * 0.15 * product.vegetable_lover + 
                    ${ques5} * 0.05 * product.is_organic + 
                    ${n_ques5} * 0.05 * product.x_organic
                     as converted_score`])
            .where('product.department_idx in (:filter)', { filter })
            .leftJoin(Product, 'product', 'product.product_idx = rectable.product_idx')
            .limit(limit)
            .offset(offset)
            .getRawMany();

        } else {

            products = await this.rectableRepository.createQueryBuilder('rectable')
            .select([`score + 
                    ${ques1} * 0.05 * product.hotel +
                    ${n_ques1} * 0.05 * product.camping + 
                    ${ques2} * 0.1 * product.make + 
                    ${n_ques2} * 0.1 * product.instant + 
                    ${ques3} * 0.05 * product.rice_lover + 
                    ${n_ques3} * 0.05 * product.desert_lover + 
                    ${ques4} * 0.15 * product.meat_lover + 
                    ${n_ques4} * 0.15 * product.vegetable_lover + 
                    ${ques5} * 0.05 * product.is_organic + 
                    ${n_ques5} * 0.05 * product.x_organic
                     as converted_score`])
            .leftJoin(Product, 'product', 'product.product_idx = rectable.product_idx')
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
