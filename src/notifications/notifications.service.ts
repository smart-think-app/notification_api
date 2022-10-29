import { Injectable, HttpStatus } from '@nestjs/common';
import { NotificationRepository } from 'src/repository/notification-repository/notification-repository.repository';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiResponse } from './../dto/api-response/api-response';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationStatusEnum } from 'src/enums/notification-status.enum';
import { DeviceRepository } from 'src/repository/device-repository/device-repository.repository';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class NotificationsService {
  constructor(
    private _notificationRepository: NotificationRepository,
    private _deviceRepository: DeviceRepository,
  ) {}
  async create(request: CreateNotificationDto): Promise<ApiResponse> {
    try {
      const uuid = uuidv4();
      const arrNotificationModel: NotificationEntity[] =
        request.receiver_account_ids.map((x) => {
          const item: NotificationEntity = {
            sender_account_id: request.sender_account_id,
            receiver_account_id: x,
            content_data: request.content,
            status: NotificationStatusEnum.Completing,
            uuid: uuid,
          };
          return item;
        });
      const insertResult =
        await this._notificationRepository.insertListNotification(
          arrNotificationModel,
        );

      if (insertResult) {
        request.receiver_account_ids.forEach(async (x) => {
          const devices = await this._deviceRepository.getDevicesByAccountId(x);
          console.log(devices);
        });

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
      return Promise.reject<ApiResponse>(error);
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
