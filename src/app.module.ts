import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '@todo/entity/task.entity';
import { TodoEntity } from '@todo/entity/todo.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5445,
    username: 'todo',
    password: 'password123',
    database: 'todo',
    entities: [TodoEntity, TaskEntity],
    synchronize: true,
    autoLoadEntities: true,
    retryAttempts: 2,
    retryDelay: 1000,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
