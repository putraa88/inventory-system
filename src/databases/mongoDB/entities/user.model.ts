import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  
  @Prop({ required: true, unique: true })
  employeeNumber: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: new Date() })
  createdDate: Date;

  @Prop({ default: new Date() })
  updatedDate: Date;

  @Prop({ default: false })
  isDeleted: boolean

}

export const UserSchema = SchemaFactory.createForClass(User);