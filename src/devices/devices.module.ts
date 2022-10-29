import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { MongoRepositoryModule } from 'src/repository/mongo-repository/mongo-repository.module';

@Module({
  imports: [MongoRepositoryModule],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
