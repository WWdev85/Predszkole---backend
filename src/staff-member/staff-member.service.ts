import { Injectable } from '@nestjs/common';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import { StaffMemberInterface } from 'src/interfaces/staffMember';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { StaffMember } from './entities/staff-member.entity';
import * as fs from 'fs';
import { storageDir } from 'src/utils/storage';
import  * as path from 'path';


@Injectable()
export class StaffMemberService {
  async createStaffMember({
    id, 
    name, 
    surname, 
    position}: CreateStaffMemberDto,
    files : MulterDiskUploadedFiles ) : Promise<CreateStaffMemberDto> {

    
     

    const photo = files?.photo?.[0] ?? null;

    try{
      const newStaffMember = new StaffMember();

      if(id){
        newStaffMember.id = id;

        const entity = await StaffMember.find({
          id: id,
        });
    
        const oldPhoto = entity[0].photoFn
        if(oldPhoto){
          fs.unlinkSync(path.join(storageDir(), 'staff-member-photos', oldPhoto));
        }
  
      }
      
      newStaffMember.name = name;
      newStaffMember.surname = surname;
      newStaffMember.position = position

      if(photo){
        newStaffMember.photoFn = photo.filename;
      }else{
        newStaffMember.photoFn = null;
      }

      await StaffMember.save(newStaffMember);

      return newStaffMember;

      }catch(e){
        if (photo){
          fs.unlinkSync(path.join(storageDir(), 'staff-member-photos', photo.filename));
        }
    }

    

  }

  async getListOfStaffMember() : Promise<StaffMemberInterface[]>{
    return await StaffMember.find();
  }

  async removeStaffMember(id : string) : Promise<void> {

    const entity = await StaffMember.find({
      id: id,
    });

    const photo = entity[0].photoFn
    if(photo){
      fs.unlinkSync(path.join(storageDir(), 'staff-member-photos', photo));
    }

    await StaffMember.delete(id);
  }

  
  async getPhoto(id: string, res: any) {
    try{
      const photo = await StaffMember.findOne(id);
      if(!photo){
        throw new Error('No object found');
      }
      if(!photo.photoFn){
        throw new Error('No photo in this entity');
      }
      res.sendFile(
        photo.photoFn,
        {
          root: path.join(storageDir(), 'staff-member-photos', )
        },
      );
    }catch (e){
      res.json({
        error: e.message,
      })
    }
   
  }


}
