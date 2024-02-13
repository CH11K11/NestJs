import { IsString,IsDate, IsOptional} from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    createdAt: Date;

    @IsString()
    @IsOptional()
    updatedAt: Date;

}