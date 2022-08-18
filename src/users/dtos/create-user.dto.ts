import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ description: '사용자 아이디' })
    @IsString()
    id: string;

    @ApiProperty({ description: '사용자 비밀번호' })
    @IsString()
    @MinLength(10)
    password: string;

    @ApiProperty({ description: '사용자 닉네임'})
    @IsString()
    nickname: string;

}