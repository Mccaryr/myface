import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    content!: string;

    @Column()
    user_id!: string;

    @Column()
    profile_url?: string;

    @Column()
    likes?: number

    @Column()
    dislikes?: number

    @Column()
    fullname!: string
}