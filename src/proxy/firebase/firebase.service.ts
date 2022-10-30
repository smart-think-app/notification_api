import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  SendNotificationRequestDto,
  SendNotificationResponseDto,
} from './dto/firebase-dto.dto';
import { AxiosRequestHeaders } from 'axios';
@Injectable()
export class FirebaseService {
  constructor(private readonly _httpService: HttpService) {
    this.token =
      'AAAAaz1i218:APA91bF38nCm2URT-9FkStKWdOQFEOANyCOJkq1NRjafpvwXMsIbn2lhxm-W6h66lsy17LIJrU_Hh-vyLaUVnfLG4xt9j-_2q4VhB0dEdtttJHkt4Vvwz6E4ZeluEIM-yo-Rd7gke3Yl';
  }
  token = '';
  getHeader(): AxiosRequestHeaders {
    const headersRequest: AxiosRequestHeaders = {};
    headersRequest['Content-Type'] = 'application/json';
    headersRequest['Authorization'] = `key=${this.token}`;
    return headersRequest;
  }

  async sendNotification(
    request: SendNotificationRequestDto,
  ): Promise<SendNotificationResponseDto> {
    try {
      const result =
        await this._httpService.axiosRef.post<SendNotificationResponseDto>(
          'https://fcm.googleapis.com/fcm/send',
          request,
          { headers: this.getHeader() },
        );
      return Promise.resolve<SendNotificationResponseDto>(result.data);
    } catch (error) {
      console.log(error);
      return Promise.reject<SendNotificationResponseDto>('error firebase');
    }
  }
}
