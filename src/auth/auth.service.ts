import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtPayload, LoginStatus, RegistrationStatus } from '@shared/utils';
import { UserCreateDto } from '@user/dto/user.createDto';
import { UserDto } from '@user/dto/user.dto';
import { LoginUserDto } from '@user/dto/user.loginDto';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService, 
        private readonly jwtService: JwtService,  
    ) {}

    async register(userDto: UserCreateDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'user registered',
        };
        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
        }
        return status;  
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus>{
        const user = await this.usersService.findByLogin(loginUserDto);

        const accessToken = this._createToken(user);

        return { username: user.username, ...accessToken };
    }
    private _createToken({username}: UserDto): any{
        const user: JwtPayload = {username: username};
       
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRES_IN_SECONDS,
            accessToken,
        }
    }

    async validateUser (payload: JwtPayload) : Promise<UserDto>{
        const user = await this.usersService.findByPayload(payload);
        if(!user){
            throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
        }
        return user;
    }

}
