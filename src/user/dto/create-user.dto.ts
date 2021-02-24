import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    email: string;

    @IsString()
    pwdHash: string;

    @IsString()
    role: string;

    @IsString()
    @IsOptional()
    group: string;
}
