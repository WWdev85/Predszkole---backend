import { Injectable } from '@nestjs/common';
import { AdvertismentInterface, GetAdvertismentResponse } from 'src/interfaces/advertisment';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import { CreateAdvertismentDto } from './dto/create-advertisment.dto';
import { Advertisment } from './entities/advertisment.entity';
import * as fs from 'fs';
import { storageDir } from 'src/utils/storage';
import  * as path from 'path';


@Injectable()
export class AdvertismentService {

  filter(advertisment : CreateAdvertismentDto) : GetAdvertismentResponse {
    const {id, title,content, createdAt } = advertisment;
    return {id, title, content, createdAt};
}

    async createAdvertisment({
      id,
      title,
      content,
      createdAt,
      group,
    } : CreateAdvertismentDto , files : MulterDiskUploadedFiles) : Promise<AdvertismentInterface>{

      const photo = files?.photo?.[0] ?? null;

      try{
            const newAdvertisment = new Advertisment();

            if(id){
              newAdvertisment.id = id;
              newAdvertisment.createdAt = createdAt;
  
              const entity = await Advertisment.find({
                id: id,
              });
          
              const oldPhoto = entity[0].photoFn
              if(oldPhoto){
                fs.unlinkSync(path.join(storageDir(), 'advertisment-photos', oldPhoto));
              }
            }
        
            newAdvertisment.title = title;
            newAdvertisment.content = content;
            newAdvertisment.group = group;

            if(photo){
              newAdvertisment.photoFn = photo.filename;
            }

            await Advertisment.save(newAdvertisment);
            return this.filter(newAdvertisment)
      } catch(e){
          if (photo){
            fs.unlinkSync(path.join(storageDir(), 'advertisment-photos', photo.filename));
          }
      }
    }

    async getListOfAdvertisment(groupId : string) : Promise<AdvertismentInterface[]>{
      if(groupId === "root"){
        return await Advertisment.find({
          group: { id: null }
        })
      }
      const advertisment = await Advertisment.find({
        group: { id: groupId }
      })
      const listOfAdvertisment = [];
      for( let adv of advertisment){
        listOfAdvertisment.push(this.filter(adv));
      } 

      return listOfAdvertisment;
    }

    async removeAdvertisment(id : string): Promise<void>{
        const entity = await Advertisment.find({
          id: id,
        });

        const photo = entity[0].photoFn
        if(photo){
          fs.unlinkSync(path.join(storageDir(), 'advertisment-photos', photo));
        }
        await Advertisment.delete(id);
    }

    async getPhoto(id: string, res: any) {
      try{
        const photo = await Advertisment.findOne(id);
        if(!photo){
          throw new Error('No object found');
        }
        if(!photo.photoFn){
          throw new Error('No photo in this entity');
        }

        res.sendFile(
          photo.photoFn,
          {
            root: path.join(storageDir(), 'advertisment-photos', )
          },
        );
       
      }catch (e){
        res.json({
          error: e.message,
        })
      }
     
    }

}
