import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    user_id!:string;

    @Column()
    profile_image!:string;

    @Column()
    email!:string;

    @Column()
    first_name!:string;

    @Column()
    last_name!:string;

    @Column()
    job!:string;

    @Column()
    education!:string;

    


}
