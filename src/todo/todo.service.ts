import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { todosMock } from 'src/mock/todos.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import * as uuid from 'uuid';
import { TodoCreateDto } from './dto/todo.createdto';
import { TodoDto } from './dto/todo.dto';
import { TodoListDto } from './dto/todo.listdto';
import { TodoEntity } from '@todo/entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class TodoService {
    todos: TodoEntity[] = todosMock;
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepo: Repository<TodoEntity>,
    ){}

    async getOneTodo(id: string): Promise<TodoDto> {
        const todo = await this.todoRepo.findOne({
            where: {id},
            relations: ['tasks'],
        });
        if (!todo){
            throw new HttpException(`Todo ${id} not found`, HttpStatus.BAD_REQUEST);
        }
        return toTodoDto(todo);
    }
    async create(todoCreateDto: TodoCreateDto): Promise<TodoDto>{
        const {name, description} = todoCreateDto;
        const todo = {
            name: name,
            description: description,
        };
        const todoEntity: TodoEntity = await this.todoRepo.create({
            name: todo.name,
            description: todo.description,
        });
        await this.todoRepo.save(todoEntity);

        return toTodoDto(todoEntity);
    }
    async update(id: string, todo: TodoDto): Promise<TodoDto>{
        const findTodo = await this.todoRepo.findOne({
            where: {id},
            relations: ['tasks'],
        })
        if (!findTodo)
            throw new HttpException(`Todo ${id} does not exist`, HttpStatus.BAD_REQUEST);
        await this.todoRepo.update({
            id: id,
         },{
            name: todo.name,
            description: todo.description
         });
        return toPromise(toTodoDto(findTodo));
    }
    async delete(id: string): Promise<TodoDto>{
        const todo = await this.todoRepo.findOne({
            where:{id}
        });
        if (!todo){
            throw new HttpException(`Todo ${id} not found`, HttpStatus.BAD_REQUEST);
        }
        await this.todoRepo.delete({
            id: id
        })
        return toPromise(toTodoDto(todo)); 
    }
    async getAllTodo(): Promise<TodoListDto>{
        const todos = await this.todoRepo.find({
            relations: ['tasks']
        });
        todos.map((todo: TodoEntity) => toTodoDto(todo));
        const todoList: TodoListDto = {
            todos: todos
        };
        return toPromise(todoList);

    }

}
