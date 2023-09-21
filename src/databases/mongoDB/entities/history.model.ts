import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Action } from "../constants/enum.constant";

@Schema()
export class History {
  
  @Prop({ required: true, enum: Action})
  action: string;

  @Prop({ required: true })
  employeeNumber: string;

  @Prop({ required: false, default: null })
  notes: string;

  @Prop({ default: new Date() })
  createdDate: Date;

  @Prop({ default: new Date() })
  updatedDate: Date;

  @Prop({ default: false })
  isDeleted: boolean

}

export const HistorySchema = SchemaFactory.createForClass(History);