import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { LoginType } from '@model';
import { MongoSchema } from './mongo';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends MongoSchema {
  @Prop()
  name: string;

  @Prop()
  avatar?: string;

  @Prop({ type: String, enum: LoginType, default: LoginType.DISCORD })
  loginType: LoginType;

  @Prop()
  thirdPartyUid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
