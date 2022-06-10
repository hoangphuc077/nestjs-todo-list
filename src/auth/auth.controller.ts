import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginStatus, RegistrationStatus } from '@shared/utils';
import { UserCreateDto } from '@user/dto/user.createDto';
import { UserDto } from '@user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){};
    @Post('register')
    public async register(@Body() createUserDto: UserCreateDto): Promise<RegistrationStatus>{
        const result = await this.authService.register(createUserDto);
        if(!result.success){
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
        }
        return result
    }
    @Post('login')
    public async login(@Body() loginUserDto: UserCreateDto): Promise<LoginStatus>{
        return await this.authService.login(loginUserDto)

    }

}
