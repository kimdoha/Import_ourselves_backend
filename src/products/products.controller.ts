import { 
    Controller, 
    Get, 
    Post, 
    Query, 
    UseGuards, 
    UseInterceptors, 
    ValidationPipe
} from '@nestjs/common';
import { 
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse, 
    ApiOperation, 
    ApiTags 
} from '@nestjs/swagger';
import { GetUser } from 'common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { responseSuccessDto } from 'common/responses/global.reponse';
import { userInfo } from 'os';
import { ProductsRequestDto } from './dtos/products.request.dto';
import { RecommendationOffRequestDto } from './dtos/recommendation-off.request';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiBearerAuth('Authorization')
@UseInterceptors(responseSuccessDto)
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){}

    @ApiOperation({ summary: '[헤더] 추천 상품 리스트 조회'})
    @ApiOkResponse({
        status: 200,
        description: '[헤더] 추천 상품 Top 리스트 조회 성공',
        type: responseSuccessDto
    })
    @Get('/recommendation-top')
    async getTop20RecommendationProducts(@Query(ValidationPipe) query: ProductsRequestDto ) {
        return await this.productsService.getRecommendationProducts(query);
    }

    @ApiOperation({ 
        summary: '[테스트 전] 구매 이력 기반 추천 상품 리스트 조회',
        description: '카테고리 필터 설정 : filter(5, 12, 16) | 카테고리 필터 해제 : filter(0)'
    })
    @ApiOkResponse({
        status: 200,
        description: '추천 상품 리스트 조회 성공',
        type: responseSuccessDto
    })
    @UseGuards(JwtAuthGuard)
    @Get('/before/recommendation')
    async getRecommedationProductsFromPurchaseHistory(@GetUser() user, @Query(ValidationPipe) query: ProductsRequestDto) {
        return await this.productsService.getRecommendationProductsFromPurchase(user.userIdx, query);
    }


    @ApiOperation({ summary: '[테스트 후] 구매 및 이벤트 이력 기반 추천 상품 리스트 조회'})
    @ApiOkResponse({
        status: 200,
        description: '[테스트 후] 추천 상품 리스트 조회 성공',
        type: responseSuccessDto
    })
    @UseGuards(JwtAuthGuard)
    @Get('/after/recommendation')
    async getRecommendationProducts(@GetUser() user, @Query(ValidationPipe) query: ProductsRequestDto) {
        return await this.productsService.getRecommendationProductsFromEvent(user.userIdx, query);
    }


    @ApiOperation({ summary: '추천 상품 off 설정'})
    @ApiCreatedResponse({
        status: 201,
        description: '추천 상품 off 설정 성공',
        type: responseSuccessDto,
    })
    @UseGuards(JwtAuthGuard)
    @Post('/recommendation-off')
    async setRecommendationOff(@GetUser() user, @Query(ValidationPipe) query: RecommendationOffRequestDto) {
        return await this.productsService.setRecommendationOff(user.userIdx, parseInt(query.departmentIdx));
    }
    

}
