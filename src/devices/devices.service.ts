import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/dto/api-response/api-response';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceRepository } from './../repository/device-repository/device-repository.repository';

@Injectable()
export class DevicesService {
  constructor(private _deviceRepository: DeviceRepository) {}
  async create(createDeviceDto: CreateDeviceDto): Promise<ApiResponse> {
    try {
      const device = await this._deviceRepository.findOneDeviceByDeviceId(
        createDeviceDto.account_id,
        createDeviceDto.device_id,
      );
      if (device != null) {
        device.fcm_token = createDeviceDto.fcm_token;
        await this._deviceRepository.updateModel(device);
        return Promise.resolve<ApiResponse>({
          data: true,
          message: 'update success',
          code: HttpStatus.OK,
        });
      }
      const insertResult = await this._deviceRepository.insertOneDevice({
        account_id: createDeviceDto.account_id,
        fcm_token: createDeviceDto.fcm_token,
        device_id: createDeviceDto.device_id,
      });

      if (insertResult) {
        return Promise.resolve<ApiResponse>({
          data: true,
          message: 'insert success',
          code: HttpStatus.OK,
        });
      }
      return Promise.resolve<ApiResponse>({
        data: false,
        message: 'register fail',
        code: HttpStatus.BAD_REQUEST,
      });
    } catch (error) {
      return Promise.reject<ApiResponse>('error mongo db');
    }
  }

  async findAll(): Promise<ApiResponse> {
    return { data: true, message: 'success', code: 200 };
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
