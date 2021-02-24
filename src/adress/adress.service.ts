import { Injectable } from '@nestjs/common';
import { AdressInterface } from 'src/interfaces/adress';
import { CreateAdressDto } from './dto/create-adress.dto';
import { Adress } from './entities/adress.entity';

@Injectable()
export class AdressService {

  async updateAdress({id, phone, email, location, link, map, facebook} : CreateAdressDto) : Promise<AdressInterface>{

    const newAdress = new Adress();
    
    if(id !== undefined){
      newAdress.id = id;
    }
    newAdress.phone = phone;
    newAdress.email = email;
    newAdress.link = link;
    newAdress.location = location;
    newAdress.map = map;
    newAdress.facebook = facebook;


    await Adress.save(newAdress);
    return newAdress
  }

  async getAdress(): Promise<AdressInterface>{
    return Adress.findOne();
  }
}
