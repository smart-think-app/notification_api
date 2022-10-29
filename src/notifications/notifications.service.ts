import { Injectable, HttpStatus } from '@nestjs/common';
import { NotificationRepository } from 'src/repository/notification-repository/notification-repository.repository';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiResponse } from './../dto/api-response/api-response';

@Injectable()
export class NotificationsService {
  constructor(private _notificationRepository: NotificationRepository) {}
  async create(request: CreateNotificationDto): Promise<ApiResponse> {
    try {
      const insertResult =
        await this._notificationRepository.insertOneNotification({
          sender_account_id: request.sender_account_id,
          receiver_account_ids: request.receiver_account_ids,
          content_data: request.content,
        });

      if (insertResult) {
        return Promise.resolve<ApiResponse>({
          data: true,
          message: 'success',
          code: HttpStatus.OK,
        });
      }
      return Promise.resolve<ApiResponse>({
        data: false,
        message: 'register fail',
        code: HttpStatus.BAD_REQUEST,
      });
    } catch (error) {
      return Promise.reject<ApiResponse>('error insert notification mongo db');
    }
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
