import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports:[
      UserModule,
      PassportModule.register({
          defaultStrategy: 'jwt',
          property: 'user',
          session: false
      }),
      JwtModule.register({
        secret: process.env.SECRET_KEY,
        signOptions:{
            expiresIn: process.env.EXPIRES_IN_SECONDS,
        }
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[
      PassportModule,
      JwtModule
  ]
})
export class AuthModule {}
