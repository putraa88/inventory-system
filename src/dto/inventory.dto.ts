import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InsertInventoryPayloadVm {
  @IsNotEmpty()
  @IsString()
  inventoryNumber: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  stock: number;
}

export class UpdateInventoryPayloadVm {
  @IsNotEmpty()
  @IsString()
  notes: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  stock: number;

  @IsOptional()
  @IsString()
  inventoryNumber: string;
}