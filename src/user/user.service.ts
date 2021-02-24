import { Injectable } from '@nestjs/common';
import { GetListOfUsersResponse, GetUserResponse, UserInterface } from 'src/interfaces/user';
import { hashPwd } from 'src/utils/hash-pwd';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  filter(user : CreateUserDto) : GetUserResponse {
    const {id, name, surname, email, role, group} = user;
    return {id, name, surname, email, role, group};
}

  async createUser( {
    id,
    name,
    surname,
    email,
    pwdHash,
    role,
    group,
  } : CreateUserDto) : Promise<UserInterface>{

    const newUser = new User();

    if(id){
      newUser.id = id;
    }
    newUser.name = name,
    newUser.surname = surname,
    newUser.email =email;
    newUser.pwdHash = hashPwd(pwdHash);
    newUser.role = role;
    newUser.group = group;

    await User.save(newUser);

    return  this.filter(newUser);
  }

  async getListOfUser(role : string) :Promise<GetListOfUsersResponse>{
    const response = [];
    const users = await User.find({
      role: role,
    });
    for(let user of users){
       response.push(this.filter(user))
    }
    return response;
  }

  async removeUser( id : string) : Promise<void>{
    await User.delete(id);
  }
}
