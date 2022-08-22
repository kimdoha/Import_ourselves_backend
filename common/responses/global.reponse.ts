import { ApiProperty } from "@nestjs/swagger";


export class responseFailDto {
    @ApiProperty({ description: '실패' })
    isSuccess: boolean;

    @ApiProperty({ description: '상태 코드' })
    statusCode: number;

    @ApiProperty({ description: '오류 메시지' })
    message: string;
}

export class responseSuccessDto {

    @ApiProperty({ description: '성공' })
    isSuccess: boolean;

    @ApiProperty({ description: '상태 코드' })
    statusCode: number;

    @ApiProperty({ description: '성공 메시지' })
    message: string;

    @ApiProperty({ description: '데이터 객체' })
    data: any;
}