import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { StaffMemberService } from './staff-member.service';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { GetListOfStaffMemberResponse, GetStaffMemberResponse } from 'src/interfaces/staffMember';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from 'src/utils/storage';
import * as path from 'path';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';

@Controller('staff-member')
export class StaffMemberController {
  constructor(private readonly staffMemberService: StaffMemberService) {}

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor([
       {
            name: 'photo', maxCount: 1,
       },
    ], { storage: multerStorage (path.join(storageDir(),'staff-member-photos'))},
    ),
 )
  create(
    @Body() staffMember: CreateStaffMemberDto,
    @UploadedFiles() files: MulterDiskUploadedFiles
    ) : Promise<GetStaffMemberResponse> {
    return this.staffMemberService.createStaffMember(staffMember, files);
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

  @Get('/photo/:id')
 async getPhoto(
    @Param('id') id: string,
    @Res() res: any,
 ): Promise<any>{
    return this.staffMemberService.getPhoto(id, res);
 }


}
