import { prop } from '@typegoose/typegoose';
import { AUTH_DOMAIN } from './session.types';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class Session {
  @ApiProperty()
  @prop({ required: true })
  sub: Types.ObjectId;

  @ApiProperty()
  @prop({ required: true })
  domain: AUTH_DOMAIN;

  @ApiProperty()
  @prop({ required: true })
  token: string;
}
