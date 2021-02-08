import { IsOptional, IsString } from "class-validator";

export class CreateStaffMemberDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    position: string;
}

