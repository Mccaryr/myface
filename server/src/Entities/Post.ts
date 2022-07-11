import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    content!: string;

    @Column()
    user_id!: number;
}