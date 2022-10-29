import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiResponse } from 'src/dto/api-response/api-response';

@Controller('api/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto, @Res() res: Response) {
    this.devicesService
      .create(createDeviceDto)
      .then((result) => {
        res.status(result.code).json(result);
      })
      .catch((err) => {
        const errResponse: ApiResponse = {
          data: null,
          message: err,
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        };
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errResponse);
      });
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}
