import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoListDto } from './dto/todo.listdto';
import { toPromise } from 'src/shared/utils';
import { TodoDto } from './dto/todo.dto';
import { TodoCreateDto } from './dto/todo.createdto';
import { TodoService } from './todo.service';

@Controller('apis/todos')
export class TodoController {
    constructor(private readonly toDoService: TodoService){}
    @Get()
    async findAll(): Promise<TodoListDto>{
        const todos = await this.toDoService.getAllTodo();
        return toPromise(todos);
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<TodoDto>{
        return await this.toDoService.getOneTodo(id);
    }

    @Post()
    async create(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto>{
        return await this.toDoService.create(todoCreateDto);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() todoDto: TodoDto): Promise<TodoDto>{
        return await this.toDoService.update(id, todoDto);
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<TodoDto>{
        return await this.toDoService.delete(id);
    }
}
