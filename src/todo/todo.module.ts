import { Module } from '@nestjs/common';
import { TaskEntity } from '@todo/entity/task.entity';
import { TodoEntity } from '@todo/entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:
    [TypeOrmModule.forFeature([TodoEntity, TaskEntity])],
  controllers: [TodoController, TaskController],
  providers: [TodoService, TaskService]
})
export class TodoModule {}
