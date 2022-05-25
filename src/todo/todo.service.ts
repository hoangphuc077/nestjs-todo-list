import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { todosMock } from 'src/mock/todos.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import * as uuid from 'uuid';
import { TodoCreateDto } from './dto/todo.createdto';
import { TodoDto } from './dto/todo.dto';
import { TodoListDto } from './dto/todo.listdto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
    todos: TodoEntity[] = todosMock;

    async getOneTodo(id: string): Promise<TodoDto> {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo){
            throw new HttpException(`Todo ${id} not found`, HttpStatus.BAD_REQUEST);
        }
        return toPromise(toTodoDto(todo));
    }
    async create(todoCreateDto: TodoCreateDto): Promise<TodoDto>{
        const {name, description} = todoCreateDto;
        const todo = {
            id: uuid.v4(),
            name: name,
            description: description
        };
        this.todos.push(todo);
        return toPromise(toTodoDto(todo));
    }
    async update(id: string, todo: TodoDto): Promise<TodoDto>{
        const findTodo = this.todos.find(todo => todo.id === id);
        const {name, description} = todo;
        if (!findTodo)
            throw new HttpException(`Todo ${id} does not exist`, HttpStatus.BAD_REQUEST);
        return toPromise(toTodoDto(findTodo));
    }
    async delete(id: string): Promise<TodoDto>{
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo){
            throw new HttpException(`Todo ${id} not found`, HttpStatus.BAD_REQUEST);
        }
        return toPromise(toTodoDto(todo)); 
    }
    async getAllTodo(): Promise<TodoListDto>{
        let todoList: TodoListDto = {
            todos: []
        };
        this.todos.forEach(todo =>{
            todoList.todos.push(toTodoDto(todo));
        })
        return toPromise(todoList);

    }

}
