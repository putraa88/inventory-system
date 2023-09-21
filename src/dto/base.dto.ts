import { IsEnum, IsNotEmpty } from "class-validator";

export class BaseResponseVm {

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  data: any;
}

export class BaseRequestPayloadVm {
  @IsNotEmpty()
  page: string;

  @IsNotEmpty()
  limit: string;

  @IsNotEmpty()
  filters: BaseRequestFilterVm[];
}

export class BaseRequestFilterVm {
  @IsNotEmpty()
  field: string;

  @IsEnum(['gte', 'lte', 'eq', 'lt', 'gt'])
  op: string;

  @IsNotEmpty()
  value: any;
}