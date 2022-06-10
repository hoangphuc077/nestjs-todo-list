import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto{
    @IsNotEmpty() username:string;
    @IsNotEmpty() password:string;;

    @IsNotEmpty() @IsEmail() email:string;

}