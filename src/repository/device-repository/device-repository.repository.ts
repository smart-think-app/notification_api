import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  DeviceDocument,
  DeviceEntity,
} from 'src/devices/entities/device.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DeviceRepository {
  constructor(
    @InjectModel('devices') private deviceModel: Model<DeviceDocument>,
  ) {}

  async insertOneDevice(entity: DeviceEntity): Promise<boolean> {
    const insertedDevice = new this.deviceModel({
      account_id: entity.account_id,
      fcm_token: entity.fcm_token,
      device_id: entity.device_id,
    });

    const result = await insertedDevice.save();
    if (result.errors) {
      return Promise.reject<boolean>(result.errors);
    }
    return true;
  }

  async getDevicesByAccountId(accountId: string): Promise<DeviceEntity[]> {
    const result = await this.deviceModel
      .find(
        {
          account_id: accountId,
        },
        { fcm_token: true },
      )
      .exec();
    return Promise.resolve<DeviceEntity[]>(result);
  }

  async findOneDeviceByDeviceId(
    accountId: string,
    deviceId: string,
  ): Promise<DeviceEntity> {
    const result = await this.deviceModel
      .findOne(
        {
          account_id: accountId,
          device_id: deviceId,
        },
        {
          account_id: true,
          device_id: true,
        },
      )
      .exec();
    return Promise.resolve<DeviceEntity>(result);
  }

  async updateModel(entity: DeviceEntity): Promise<boolean> {
    await this.deviceModel
      .updateOne(
        {
          account_id: entity.account_id,
          device_id: entity.device_id,
        },
        {
          $set: {
            fcm_token: entity.fcm_token,
          },
        },
      )
      .exec();
    return Promise.resolve<boolean>(true);
  }
}
