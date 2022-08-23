import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches } from "class-validator";
import { PageRequest } from "helpers/page/page.request";

export class ProductsRequestDto extends PageRequest{
    constructor() { 
        super(); 
    }

    @ApiProperty()
    @IsString()
    @Matches('main|detail')
    type: string;

    @ApiProperty()
    @IsOptional()
    @Matches('0|5|12|16')
    filter: string;
}