import { 
    Controller, 
    UseGuards, 
    UseInterceptors 
} from '@nestjs/common';
import { 
    ApiOkResponse, 
    ApiOperation, 
    ApiTags 
} from '@nestjs/swagger';
import { GetUser } from 'common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { responseSuccessDto } from 'common/responses/global.reponse';
import { userInfo } from 'os';
import { ProductsService } from './products.service';

@ApiTags('products')
@UseInterceptors(responseSuccessDto)
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
    constructor(private productsService: ProductsService){}

    @ApiOperation({ summary: '[헤더] 추천 상품 리스트 조회'})
    @ApiOkResponse({

    })
    async getRecommendProducts(@GetUser() user) {

    }

    @ApiOperation({ summary: ' 추천 상품 on/off 설정'})
    @ApiOkResponse({

    })
    async setRecommendProductForMe(@GetUser() user) {
        
    }
    
}
