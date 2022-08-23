import { 
    createParamDecorator,
    ExecutionContext,
} from "@nestjs/common";
import { User } from "src/users/user.entity";

export const GetUser = createParamDecorator(
    (data: never, context: ExecutionContext): User => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
)