import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    DevicesModule,
    MongooseModule.forRoot('mongodb://localhost/notification_2'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
