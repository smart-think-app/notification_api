export class CreateNotificationDto {
  sender_account_id: string;
  receiver_account_ids: string[];
  content: any;
}
