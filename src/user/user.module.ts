import { Module } from '@nestjs/common';
import { UserEntity } from '@user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Module({ imports:
    [TypeOrmModule.forFeature([UserEntity])], 
    providers: [UserService],
    exports: [UserService],
}) export class UserModule {}
