import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  email: String;

  @Prop()
  password: String;

  @Prop()
  otp: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
