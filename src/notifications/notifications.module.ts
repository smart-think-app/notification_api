import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongoRepositoryModule } from 'src/repository/mongo-repository/mongo-repository.module';
import { FirebaseModule } from 'src/proxy/firebase/firebase.module';

@Module({
  imports: [MongoRepositoryModule, FirebaseModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
