import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    forwardRef(() => MailModule),
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
