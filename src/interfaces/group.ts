import { StaffMember } from "src/staff-member/entities/staff-member.entity";

export interface GroupInterface{
    id: string,
    name: string,
    numberOfChildren: number,
    teacher?: StaffMember,
}

export type GetGroupResponse = GroupInterface;

export type GetListOfGroupResponse = GroupInterface[];