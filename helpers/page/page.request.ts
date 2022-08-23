import { ApiProperty } from "@nestjs/swagger";
import { IsPositive } from "class-validator";

export abstract class PageRequest {
    
    @ApiProperty()
    @IsPositive()
    page: number | 1;

    @ApiProperty()
    @IsPositive()
    limit: number | 10;
}