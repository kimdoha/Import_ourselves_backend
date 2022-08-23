import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches } from "class-validator";
import { PageRequest } from "helpers/page/page.request";

export class ProductsRequestDto extends PageRequest{
    constructor() { 
        super(); 
    }

    @ApiProperty()
    @IsString()
    @Matches('main|detail')
    type: string;
}