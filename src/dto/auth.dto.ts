import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { BaseResponseVm } from "./base.dto";

export class LoginPayloadVm {
  
  @IsNotEmpty()
  @IsString()
  email: string
  
  @IsString()
  @IsNotEmpty()
  password: string;

}

export class RegisterPayloadVm {

  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  fullName: string
  
  @IsString()
  @IsNotEmpty()
  employeeNumber: string;

  @IsNotEmpty()
  @IsString()
  email: string
  
  @IsString()
  @IsNotEmpty()
  password: string;

}

export class LoginResponseVm extends BaseResponseVm {
  @IsObject()
  data: { 
    fullName: string,
    username: string,
    email: string,
    employeeNumber: string,
    token: string 
  };
}