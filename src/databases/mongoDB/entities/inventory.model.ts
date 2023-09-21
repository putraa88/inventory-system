import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Inventory {
  
  @Prop({ required: true, unique: true })
  inventoryNumber: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ default: new Date() })
  createdDate: Date;

  @Prop({ default: new Date() })
  updatedDate: Date;

  @Prop({ default: false })
  isDeleted: boolean

}

export const InventorySchema = SchemaFactory.createForClass(Inventory);