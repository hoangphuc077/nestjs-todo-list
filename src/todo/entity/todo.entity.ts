import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity('todo')
export class TodoEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description?: string;

    @OneToMany(type => TaskEntity, task => task.todo) tasks?: TaskEntity[];

}