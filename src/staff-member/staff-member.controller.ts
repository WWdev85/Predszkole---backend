import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { StaffMemberService } from './staff-member.service';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { GetListOfStaffMemberResponse, GetStaffMemberResponse } from 'src/interfaces/staffMember';

@Controller('staff-member')
export class StaffMemberController {
  constructor(private readonly staffMemberService: StaffMemberService) {}

  @Post('/')
  create(@Body() staffMember: CreateStaffMemberDto) : Promise<GetStaffMemberResponse> {
    return this.staffMemberService.createStaffMember(staffMember);
  }

  @Get('/')
  getListOffStaffMember() : Promise<GetListOfStaffMemberResponse>{
    return this.staffMemberService.getListOfStaffMember();
  }

  @Delete('/:id')
  removeStaffMember(
    @Param('id') id: string
  ) : void{
    this.staffMemberService.removeStaffMember(id);
  }


}
