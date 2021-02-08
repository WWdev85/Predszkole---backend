import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    email: string;

    @IsString()
    pwdHash: string;

    @IsString()
    role: string;

    @IsString()
    group: string;
}
