import { Module } from '@nestjs/common';
import { DeadlineController } from './deadline.controller';
import { DeadlineService } from './deadline.service';

@Module({
  controllers: [DeadlineController],
  providers: [DeadlineService],
})
export class DeadlineModule {}
