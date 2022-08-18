import { 
    BadRequestException, 
    Injectable 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responseSuccessDto } from 'common/global.reponse';
import { createHashedPassword } from 'functions/create.hashed-password';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: UserRepository,
    ) {}

    async createUser(id: string, password: string, nickname: string){
        if(await this.userRepository.findOneBy({ id })){
            throw new BadRequestException('이미 존재하는 아이디입니다.');
        }

        const hashedPassword = await createHashedPassword(password);

        const user = await this.userRepository.create({ id, password: hashedPassword, nickname });

        return { 
            isSuccess: true,
            statusCode: 201,
            message: '회원 가입 성공',
            data: Object.assign(user, { password: undefined }) 
        };
    }
}
