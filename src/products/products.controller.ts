import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { responseSuccessDto } from 'common/responses/global.reponse';
import { ProductsService } from './products.service';

@ApiTags('products')
@UseInterceptors(responseSuccessDto)
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){}
    
}
