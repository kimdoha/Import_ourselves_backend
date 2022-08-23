import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export abstract class PageRequest {
    
    @ApiProperty()
    @IsNotEmpty()
    page: number | 1;

    @ApiProperty()
    @IsNotEmpty()
    limit: number | 10;
}