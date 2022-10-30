export class SendNotificationRequestDto {
  registration_ids: string[];
  data: any;
  notification: SendNotificationBodyRequestDto;
}

export class SendNotificationBodyRequestDto {
  title: string;
  body: string;
}

export class SendNotificationResponseDto {
  success: number;
  failure: number;
}
