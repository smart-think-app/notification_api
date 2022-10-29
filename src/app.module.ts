import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationRepositoryModule } from './repository/notification-repository/notification-repository.module';
@Module({
  imports: [
    DevicesModule,
    MongooseModule.forRoot('mongodb://localhost/notification_2'),
    NotificationsModule,
    NotificationRepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
