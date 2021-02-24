import { Controller, Post, Body, Get} from '@nestjs/common';
import { GetAdressResponse } from 'src/interfaces/adress';
import { AdressService } from './adress.service';
import { CreateAdressDto } from './dto/create-adress.dto';


@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

@Post('/')
updateAdress(
  @Body() adress: CreateAdressDto
): Promise <GetAdressResponse>{
  return this.adressService.updateAdress(adress);
}

@Get('/')
getAdress() : Promise<GetAdressResponse>{
  return this.adressService.getAdress();
}
}
