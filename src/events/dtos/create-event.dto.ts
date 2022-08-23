import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class CreateEventDto {
    
    @ApiProperty()
    @IsBoolean()
    ques1: number;
    
    @ApiProperty()
    @IsBoolean()
    ques2: number;
    
    @ApiProperty()
    @IsBoolean()
    ques3: number;
    
    @ApiProperty()
    @IsBoolean()
    ques4: number;
    
    @ApiProperty()
    @IsBoolean()
    ques5: number;
    
    @ApiProperty()
    @IsBoolean()
    ques6: number;

}