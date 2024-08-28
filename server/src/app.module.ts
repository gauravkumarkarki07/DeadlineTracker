import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './Database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { ProjectModule } from './Project/project.module';
import { DeadlineModule } from './Deadline/deadline.module';
import { JwtMiddleware } from './Middlewares/JwtMiddleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).exclude('auth/(.*)').forRoutes('*');
  }
}
