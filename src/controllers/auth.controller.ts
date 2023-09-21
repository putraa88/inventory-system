import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { LoginPayloadVm, RegisterPayloadVm } from 'src/dto/auth.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() payload: LoginPayloadVm,
  ) {
    return this.authService.login(payload);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(
    @Body() payload: RegisterPayloadVm,
  ) {
    return this.authService.register(payload);
  }
}
