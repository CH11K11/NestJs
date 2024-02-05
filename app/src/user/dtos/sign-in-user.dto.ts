import { IsString, isEmpty} from "class-validator";

export class SignInUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

}