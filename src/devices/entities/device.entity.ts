import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDocument = DeviceEntity & Document;

@Schema()
export class DeviceEntity {
  @Prop({ required: true })
  device_id: string;

  @Prop({ required: true })
  account_id: string;

  @Prop()
  fcm_token: string;
}

export const DeviceSchema = SchemaFactory.createForClass(DeviceEntity);
