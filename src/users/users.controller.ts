import { Body, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { responseSuccessDto } from 'common/global.reponse';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: '회원 가입'})
    @ApiCreatedResponse({
        status: 201,
        description: '회원 가입 성공',
        type: responseSuccessDto,
    })
    @ApiBadRequestResponse({
        status: 400,
        description: '이미 존재하는 아이디입니다.',
    })
    @ApiBody({ type: CreateUserDto })
    @UseInterceptors(responseSuccessDto)
    @Post('/sign-up')
    async signup(@Body(ValidationPipe) body: CreateUserDto) {
        return await this.usersService.createUser(body.id, body.password, body.nickname);
    }


    @Post('login')
    async login() {

    }


}
