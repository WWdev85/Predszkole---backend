import { IsOptional, IsString } from "class-validator";
import { StaffMember } from "src/staff-member/entities/staff-member.entity";


export class CreateGroupDto {

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    name: string;

    @IsString()
    teacher?: StaffMember;
}
