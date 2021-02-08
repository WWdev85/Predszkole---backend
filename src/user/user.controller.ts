import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserResponse } from 'src/interfaces/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  cerateUser(
    @Body() user : CreateUserDto
  ): Promise<GetUserResponse>{
    return this.userService.createUser(user);
  }

  @Delete('/:id')
  removeUser(
    @Param('id') id: string
  ): void {
    this.userService.removeUser(id);
  }
}
