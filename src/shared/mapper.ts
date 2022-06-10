import { TaskDto } from "@todo/dto/task.dto";
import { TaskEntity } from "@todo/entity/task.entity";
import { UserDto } from "@user/dto/user.dto";
import { UserEntity } from "@user/entity/user.entity";
import { TodoDto } from "src/todo/dto/todo.dto";
import { TodoEntity } from "src/todo/entity/todo.entity";

export const toUserDto = (data: UserEntity) : UserDto => {
    const {username, password, email} = data;
    let userDto: UserDto = {username, password, email};

    return userDto;
}
export const toTodoDto = (data: TodoEntity) : TodoDto => {
    const {id, name, description, tasks} = data;
    let todoDto: TodoDto = {id, name, description};
    if(tasks){
        todoDto = {
            ...todoDto,
            tasks: tasks.map((task: TaskEntity) => toTaskDto(task),)
        };
    }
    return todoDto;
}

export function toTaskDto(task: TaskEntity): TaskDto {
    const {id, name, createdOn} = task;
    let taskDto: TaskDto = {id, name, createdOn};
    return taskDto;
}

