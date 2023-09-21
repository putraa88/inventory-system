import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/controllers/auth.controller';
import { User, UserSchema } from 'src/databases/mongoDB/entities/user.model';
import { AuthService } from 'src/services/auth.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }]
      ),
      JwtModule.register({
        global: true, 
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      })
    ],
    controllers: [AuthController],
    providers: [AuthService],
  })
  export class AuthModule {}
