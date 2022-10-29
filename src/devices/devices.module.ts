import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceRepositoryModule } from 'src/repository/device-repository/device-repository.module';

@Module({
  imports: [DeviceRepositoryModule],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
