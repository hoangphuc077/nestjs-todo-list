import { IsEmail, IsNotEmpty} from "class-validator";

export class UserCreateDto{
    @IsNotEmpty() username:string;
    @IsNotEmpty() password:string;;

    @IsNotEmpty() @IsEmail() email:string;

}