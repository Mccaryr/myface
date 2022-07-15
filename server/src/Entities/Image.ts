import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photos extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    user_id!:string;

    @Column()
    image!:string;

    @Column()
    post_id?:number;


}
