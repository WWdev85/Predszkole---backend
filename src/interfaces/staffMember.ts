import { Group } from "src/group/entities/group.entity";


export interface StaffMemberInterface{
    id?: string,
    name: string,
    surname: string,
    position: string,
}

export type GetStaffMemberResponse = StaffMemberInterface;

export type GetListOfStaffMemberResponse = StaffMemberInterface[];