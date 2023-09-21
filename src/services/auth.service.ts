import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/databases/mongoDB/entities/user.model';
import { LoginPayloadVm, LoginResponseVm, RegisterPayloadVm } from 'src/dto/auth.dto';
import { BaseResponseVm } from 'src/dto/base.dto';
import { comparePassword, hashPassword } from 'src/utils/bcrypt.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<User>,
    private jwtService: JwtService,
  ){}
  async login(payload: LoginPayloadVm): Promise<LoginResponseVm> {
    const response = new LoginResponseVm();

    const exist = await this.userRepository.findOne({ email: payload.email })
    .catch(e => {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if (!exist) throw new HttpException('wrong email / password', HttpStatus.BAD_REQUEST);
    
    const passwordCheck = await comparePassword(payload.password, exist.password);
    if (!passwordCheck) throw new HttpException('wrong email / password', HttpStatus.BAD_REQUEST);
    
    response.status = 'success';
    response.message = 'login successfull';
    response.data = {
      username: exist.username,
      email: exist.email,
      fullName: exist.fullName,
      employeeNumber: exist.employeeNumber,
      token: await this.jwtService.signAsync({
        employeeNumber: exist.employeeNumber,
        fullName: exist.fullName,
      }),
    }
    return response;
  }

  async register(payload: RegisterPayloadVm): Promise<BaseResponseVm> {
    const newUser = new User();
    newUser.employeeNumber = payload.employeeNumber
    newUser.fullName = payload.fullName;
    newUser.username = payload.username;
    newUser.email = payload.email;
    newUser.password = await hashPassword(payload.password);

    await this.userRepository.create(newUser)
    .catch(e => {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    const response = new BaseResponseVm();
    response.status = 'ok';
    response.message = 'register successfull, please login to continue';
    return response;
  }
}
