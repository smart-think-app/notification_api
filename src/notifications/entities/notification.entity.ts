import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type NotificationDocument = NotificationEntity & Document;

@Schema()
export class NotificationEntity {
  @Prop({ required: true })
  sender_account_id: string;

  @Prop({ required: true })
  receiver_account_id: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  content_data: any;

  @Prop()
  status: number;

  @Prop({ required: true })
  uuid: string;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationEntity);
