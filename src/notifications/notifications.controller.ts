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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiResponse } from 'src/dto/api-response/api-response';
import { Response } from 'express';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() request: CreateNotificationDto, @Res() res: Response) {
    this.notificationsService
      .create(request)
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
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
