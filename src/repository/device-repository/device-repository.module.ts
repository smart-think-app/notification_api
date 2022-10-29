import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from 'src/devices/entities/device.entity';
import { DeviceRepository } from './device-repository.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'device', schema: DeviceSchema }]),
  ],
  providers: [DeviceRepository],
  exports: [DeviceRepository],
})
export class DeviceRepositoryModule {}
