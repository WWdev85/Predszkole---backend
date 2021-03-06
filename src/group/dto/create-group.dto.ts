import { IsNumber, IsOptional, IsString } from "class-validator";
import { StaffMember } from "src/staff-member/entities/staff-member.entity";


export class CreateGroupDto {

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    name: string;

    @IsNumber()
    numberOfChildren: number;

    @IsString()
    teacher?: StaffMember;
}
