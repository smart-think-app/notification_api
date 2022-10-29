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
}
