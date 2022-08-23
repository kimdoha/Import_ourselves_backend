import { 
    BadRequestException, 
    Injectable 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responseSuccessDto } from 'common/responses/global.reponse';
import { createHashedPassword } from 'functions/create.hashed-password';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async createUser(id: string, password: string, nickname: string){
        if(await this.userRepository.findOneBy({ id })){
            throw new BadRequestException('이미 존재하는 아이디입니다.');
        }

        const hashedPassword = await createHashedPassword(password);

        const user = await this.userRepository.create({ id, password: hashedPassword, nickname });
        await this.userRepository.save(user);
        
        return { 
            isSuccess: true,
            statusCode: 201,
            message: '회원 가입 성공',
            data: Object.assign(user, { password: undefined }) 
        };
    }

    async login(id: string, password: string) {
        const user = await this.userRepository.findOneBy({ id });
        if(!user){
            throw new BadRequestException('아이디가 존재하지 않습니다.');
        }

        if(!(await bcrypt.compare(password, user.password))){
            throw new BadRequestException('비밀번호가 일치하지 않습니다.');
        }
        const payload = { id };

        return { 
            isSuccess: true,
            statusCode: 200,
            message: '로그인 성공',
            data: Object.assign(user, { password: undefined, accessToken: await this.jwtService.signAsync(payload) }) 
        };
    }

}
