import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffMemberModule } from './staff-member/staff-member.module';
import { GroupModule } from './group/group.module';
import { AdvertismentModule } from './advertisment/advertisment.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { AdressModule } from './adress/adress.module';
import { MealModule } from './meal/meal.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    StaffMemberModule,
    GroupModule,
    AdvertismentModule,
    UserModule,
    MailModule,
    AuthModule,
    AdressModule,
    MealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
