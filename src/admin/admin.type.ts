import { prop, pre, plugin } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import * as uniqueValidator from 'mongoose-unique-validator';
import { compare } from 'bcryptjs';
import { Field, ObjectType } from '@nestjs/graphql';

@plugin(uniqueValidator, { message: '{VALUE} already taken' })
@pre<Admin>('save', function() {
  this.password = hashSync(this.password);
})
@ObjectType()
export class Admin {
  @Field()
  @prop({ required: true })
  name: string;

  @Field()
  @prop({ unique: true })
  username: string;

  @Field()
  @prop({ unique: true })
  email: string;

  @Field()
  @prop({ minlength: 6 })
  password: string;

  comparePassword(passwordText: string): Promise<boolean> {
    return compare(passwordText, this.password);
  }
}
