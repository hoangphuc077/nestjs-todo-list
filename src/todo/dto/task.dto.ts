import { TodoDto } from "./todo.dto";
import { IsNotEmpty, IsString } from "class-validator"

export class TaskDto{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    createdOn?: Date;
}