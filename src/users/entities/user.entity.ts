import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fname: string

    @Column()
    lname: string

    @Column()
    address: string

    @Column({ unique: true })
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    age: number

    @Column()
    phone: string


    @Column()
    image: string



    @Column()
    gender: string
}
