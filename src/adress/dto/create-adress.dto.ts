import { IsOptional, IsString } from "class-validator";

export class CreateAdressDto {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    location: string;

    @IsString()
    link: string;

    @IsString()
    map: string;

    @IsString()
    facebook: string;
}
