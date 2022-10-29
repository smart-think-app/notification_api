import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongoRepositoryModule } from 'src/repository/mongo-repository/mongo-repository.module';

@Module({
  imports: [MongoRepositoryModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
