import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  username: String;

  @Prop()
  password: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
