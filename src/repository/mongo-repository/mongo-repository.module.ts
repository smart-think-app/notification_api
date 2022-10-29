import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from 'src/devices/entities/device.entity';
import { NotificationSchema } from 'src/notifications/entities/notification.entity';
import { DeviceRepository } from '../device-repository/device-repository.repository';
import { NotificationRepository } from '../notification-repository/notification-repository.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'devices', schema: DeviceSchema },
      { name: 'notifications', schema: NotificationSchema },
    ]),
  ],
  providers: [DeviceRepository, NotificationRepository],
  exports: [DeviceRepository, NotificationRepository],
})
export class MongoRepositoryModule {}
