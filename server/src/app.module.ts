import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './Database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { ProjectModule } from './Project/project.module';
import { DeadlineModule } from './Deadline/deadline.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DatabaseModule,
    ProjectModule,
    DeadlineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
