import { Injectable} from '@nestjs/common';
import * as path from 'path';
import { GroupInterface } from 'src/interfaces/group';
import { MailService } from 'src/mail/mail.service';
import { storageDir } from 'src/utils/storage';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';


@Injectable()
export class GroupService {

  constructor(private readonly mailService: MailService){}

  async createGroup( {id, name, numberOfChildren, teacher} : CreateGroupDto) : Promise<GroupInterface>{

    const newGroup = new Group();

    if(id){
      newGroup.id = id;
    }
    console.log(name);
    newGroup.name = name;
    newGroup.teacher = teacher
    newGroup.numberOfChildren =numberOfChildren;

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




  
  async getPhoto(id: string, res: any) {
    try{
      const photo = await Group.findOne(id);
      if(!photo){
        throw new Error('No object found');
      }
      if(!photo.photoFn){
        throw new Error('No photo in this entity');
      }
      res.sendFile(
        photo.photoFn,
        {
          root: path.join(storageDir(), 'group-photos', )
        },
      );
    }catch (e){
      res.json({
        error: e.message,
      })
    }
   
  }

}
