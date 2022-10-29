import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationDocument,
  NotificationEntity,
} from 'src/notifications/entities/notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel('notifications')
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async insertOneNotification(entity: NotificationEntity): Promise<boolean> {
    const insertedNotification = new this.notificationModel(entity);

    const result = await insertedNotification.save();
    if (result.errors) {
      return Promise.reject<boolean>(result.errors);
    }
    return true;
  }

  async insertListNotification(
    entities: NotificationEntity[],
  ): Promise<boolean> {
    try {
      await this.notificationModel.insertMany(entities);
      return Promise.resolve<boolean>(true);
    } catch (error) {
      return Promise.reject<boolean>(error);
    }
  }
}
