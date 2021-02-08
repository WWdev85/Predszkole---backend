import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { GetAdvertismentResponse, GetListOfAdvertismentResponse } from 'src/interfaces/advertisment';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import { multerStorage, storageDir } from 'src/utils/storage';
import { AdvertismentService } from './advertisment.service';
import { CreateAdvertismentDto } from './dto/create-advertisment.dto';


@Controller('advertisment')
export class AdvertismentController {
  constructor(private readonly advertismentService: AdvertismentService) {}

 @Post('/')
 @UseInterceptors(
    FileFieldsInterceptor([
       {
            name: 'photo', maxCount: 1,
       },
    ], { storage: multerStorage (path.join(storageDir(),'advertisment-photos'))},
    ),
 )
 createAdvertisment(
    @Body() advertisment : CreateAdvertismentDto,
    @UploadedFiles() files: MulterDiskUploadedFiles
     ) :Promise <GetAdvertismentResponse>{
    return this.advertismentService.createAdvertisment(advertisment , files);
 }

 @Get('/:group')
 getListOfAdvertisment(
    @Param('group') group: string
 ): Promise<GetListOfAdvertismentResponse>{
    return this.advertismentService.getListOfAdvertisment(group);
 }
 
 @Delete('/:id')
 removeAdvertisment(
   @Param('id') id: string,
 ): void {
   this.advertismentService.removeAdvertisment(id);
 }

 @Get('/photo/:id')
 async getPhoto(
    @Param('id') id: string,
    @Res() res: any,
 ): Promise<any>{
    return this.advertismentService.getPhoto(id, res);
 }

}
