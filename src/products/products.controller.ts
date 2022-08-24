import { 
    Controller, 
    Get, 
    Query, 
    UseGuards, 
    UseInterceptors, 
    ValidationPipe
} from '@nestjs/common';
import { 
    ApiBearerAuth,
    ApiOkResponse, 
    ApiOperation, 
    ApiTags 
} from '@nestjs/swagger';
import { GetUser } from 'common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { responseSuccessDto } from 'common/responses/global.reponse';
import { userInfo } from 'os';
import { ProductsRequestDto } from './dtos/products.request.dto';
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
    @Get('/before/recommendation-top')
    async getTop20RecommendationProducts(@Query(ValidationPipe) query: ProductsRequestDto ) {
        return await this.productsService.getRecommendationProducts(query);
    }

    @ApiOperation({ 
        summary: '구매 이력 기반 추천 상품 리스트 조회',
        description: '카테고리 필터 설정 : filter(5, 12, 16) | 카테고리 필터 해제 : filter(0)'
    })
    @ApiOkResponse({
        status: 200,
        description: '구매 이력 기반 추천 상품 리스트 조회 성공',
        type: responseSuccessDto
    })
    @Get('/before/recommendation')
    async getRecommedationProductsFromPurchaseHistory(@Query(ValidationPipe) query: ProductsRequestDto) {
        return await this.productsService.getRecommendationProductsFromPurchase(query);
    }

    @ApiOperation({ summary: ' 추천 상품 on/off 설정'})
    @ApiOkResponse({
        status: 200
    })
    async setRecommendProductForMe(@GetUser() user) {
        
    }
    
}
