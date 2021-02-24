import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetListOfUsersResponse, GetUserResponse } from 'src/interfaces/user';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-object-decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  cerateUser(
    @Body() user : CreateUserDto
  ): Promise<GetUserResponse>{
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  getUser(
    @UserObj() user: User,
  ){
    const {email, role, group} = user
    return  {email, role, group};
  }

  @Get('/:role')
  GetListOfUsers(
    @Param('role') role : string
  ): Promise<GetListOfUsersResponse> {
    return this.userService.getListOfUser(role);
  }

  @Delete('/:id')
  removeUser(
    @Param('id') id: string
  ): void {
    this.userService.removeUser(id);
  }
}
