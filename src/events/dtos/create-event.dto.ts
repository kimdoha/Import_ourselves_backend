import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateEventDto {
    
    @ApiProperty()
    @IsString()
    ques1: string;
    
    @ApiProperty()
    @IsString()
    ques2: string;
    
    @ApiProperty()
    @IsString()
    ques3: string;
    
    @ApiProperty()
    @IsString()
    ques4: string;
    
    @ApiProperty()
    @IsString()
    ques5: string;
    

}