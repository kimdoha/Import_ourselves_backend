import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RecommendationOffRequestDto {
    
    @ApiProperty()
    @IsString()
    departmentIdx: string;
}