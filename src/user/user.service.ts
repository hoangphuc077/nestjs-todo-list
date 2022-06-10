import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from '@shared/mapper';
import { toPromise } from '@shared/utils';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.createDto';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/user.loginDto';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepo : Repository<UserEntity>
    ){}

    private async comparePasswords(storedHash: string, incomingPasswords: string): Promise<Boolean>{
        const hash = await bcrypt.hash(incomingPasswords, 10);
        const isEqual = await bcrypt.compare(incomingPasswords, storedHash)
        if(isEqual)
            return toPromise(true);
        return toPromise(false);
    }
    async findOne(option?: object): Promise<UserDto>{
        const user = await this.userRepo.findOne(option);
        return toUserDto(user);
    }

    async findByLogin({username, password}: LoginUserDto): Promise<UserDto>{
        const user : UserEntity = await this.userRepo.findOne({where: {username}});
        if(!user){
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }
        const isEqual = await this.comparePasswords(user.password, password);
        if(!isEqual){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        }
        return toUserDto(user);
    }
    async findByPayload({username}: any): Promise<UserDto>{
        return await this.userRepo.findOne({where: {username}});
    }

    async create(user: UserCreateDto):Promise<UserDto>{
        const userCheck = await this.userRepo.findOne({where: {username: user.username}});
        if(userCheck){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
        }

        const userEntity: UserEntity = await this.userRepo.create( {
            username: user.username,
            password: user.password,
            email: user.email
        });
        await this.userRepo.save(userEntity);
        return toUserDto(userEntity);
    } 
}
