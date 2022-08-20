import { 
    Body, 
    Controller, 
    Post, 
    UseInterceptors, 
    ValidationPipe 
} from '@nestjs/common';
import { 
    ApiBadRequestResponse, 
    ApiBody, 
    ApiCreatedResponse, 
    ApiOkResponse, 
    ApiOperation, 
    ApiTags 
} from '@nestjs/swagger';
import { responseSuccessDto } from 'common/global.reponse';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@UseInterceptors(responseSuccessDto)
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
    @Post('/sign-up')
    async signup(@Body(ValidationPipe) body: CreateUserDto) {
        return await this.usersService.createUser(body.id, body.password, body.nickname);
    }

    @ApiOperation({ summary: '로그인' })
    @ApiOkResponse({
        status: 200, 
        description: '로그인 성공',
        type: responseSuccessDto,
    })
    @ApiBadRequestResponse({
        status: 400,
        description: '아이디가 존재하지 않습니다./비밀번호가 일치하지 않습니다.'
    })
    @ApiBody({ type: LoginUserDto })
    @Post('/sign-in')
    async signIn(@Body(ValidationPipe) body: LoginUserDto) {
        return await this.usersService.login(body.id, body.password);
    }


}
