import { Injectable } from '@nestjs/common';
import { StaffMemberInterface } from 'src/interfaces/staffMember';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { StaffMember } from './entities/staff-member.entity';

@Injectable()
export class StaffMemberService {
  async createStaffMember({id, name, surname, position}: CreateStaffMemberDto) : Promise<CreateStaffMemberDto> {

    const newStaffMember = new StaffMember();

    if(id){
      newStaffMember.id = id;
    }
    
    newStaffMember.name = name;
    newStaffMember.surname = surname;
    newStaffMember.position = position

    await StaffMember.save(newStaffMember);

    return newStaffMember;

  }

  async getListOfStaffMember() : Promise<StaffMemberInterface[]>{
    return await StaffMember.find();
  }

  async removeStaffMember(id : string) : Promise<void> {
    await StaffMember.delete(id);
  }


}
