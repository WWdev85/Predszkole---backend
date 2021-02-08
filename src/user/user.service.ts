import { Injectable } from '@nestjs/common';
import { GetUserResponse, UserInterface } from 'src/interfaces/user';
import { hashPwd } from 'src/utils/hash-pwd';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  filter(user : CreateUserDto) : GetUserResponse {
    const {id, email} = user;
    return {id, email};
}

  async createUser( {
    id,
    email,
    pwdHash,
    role,
    group,
  } : CreateUserDto) : Promise<UserInterface>{

    const newUser = new User();

    if(id !== undefined ){
      newUser.id = id;
    }

    newUser.email =email;
    newUser.pwdHash = hashPwd(pwdHash);
    newUser.role = role;
    newUser.group = group;

    await User.save(newUser);

    return  this.filter(newUser);
  }

  async removeUser( id : string) : Promise<void>{
    await User.delete(id);
  }
}
