import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GetGroupResponse, GetListOfGroupResponse } from 'src/interfaces/group';
import { PasswordProtectGuard } from 'src/guards/password-protect-guard.ts';
import { UsePassword } from 'src/decorators/use-password-decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-object-decorator';
import { User } from 'src/user/entities/user.entity';
import { UserRoleGuard } from 'src/guards/user-role-guard';


@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/')
  createGroup(
    @Body() group : CreateGroupDto
  ) : Promise<GetGroupResponse>{

    return this.groupService.createGroup(group);
  }


  // @UseGuards(PasswordProtectGuard)
  // @UsePassword('admin1')

  //@UseGuards(AuthGuard('jwt'))
  @Get('/')
  getListOfGroup(
   // @UserObj() user: User,
  ) :Promise<GetListOfGroupResponse>{
    //console.log(user);
    return this.groupService.getListOfGroup();
  }
 
  @Delete('/:id')
  removeGroup(
    @Param('id') id: string
  ): void{
    this.groupService.removeGroup(id);
  }
}
