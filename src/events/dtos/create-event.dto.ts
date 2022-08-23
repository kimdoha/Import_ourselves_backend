import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateEventDto {
    
    @ApiProperty()
    @IsNumber()
    ques1: number;
    
    @ApiProperty()
    @IsNumber()
    ques2: number;
    
    @ApiProperty()
    @IsNumber()
    ques3: number;
    
    @ApiProperty()
    @IsNumber()
    ques4: number;
    
    @ApiProperty()
    @IsNumber()
    ques5: number;
    

}