import { Injectable} from '@nestjs/common';
import { GroupInterface } from 'src/interfaces/group';
import { MailService } from 'src/mail/mail.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';


@Injectable()
export class GroupService {

  constructor(private readonly mailService: MailService){}

  async createGroup( {id, name, teacher} : CreateGroupDto) : Promise<GroupInterface>{

    const newGroup = new Group();

    if(id){
      newGroup.id = id;
    }
    console.log(name);
    newGroup.name = name;
    newGroup.teacher = teacher

    await Group.save(newGroup);

    return newGroup;
  }

  async getListOfGroup() :Promise<GroupInterface[]>{

    //await this.mailService.sendMail('wasekw@gmail.com', 'sadasdasdsadsadsadsad', 'sadasdadasasdasd');

    return await Group.find({
      relations: ['teacher']
    })
  }

  async removeGroup(id: string) :Promise<void>{
    await Group.delete(id)
  }

}
