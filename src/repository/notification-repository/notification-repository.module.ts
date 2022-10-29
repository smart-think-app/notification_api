import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from 'src/notifications/entities/notification.entity';
import { NotificationRepository } from './notification-repository.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'notifications', schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationRepository],
  exports: [NotificationRepository],
})
export class NotificationRepositoryModule {}
