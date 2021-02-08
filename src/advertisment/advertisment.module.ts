import { Module } from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import { AdvertismentController } from './advertisment.controller';

@Module({
  controllers: [AdvertismentController],
  providers: [AdvertismentService]
})
export class AdvertismentModule {}
