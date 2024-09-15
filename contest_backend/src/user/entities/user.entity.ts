import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    googleId: string;

    @PrimaryColumn()
    email: string;

    @Column()
    name: string;

    @Column()
    email_receive: boolean;

    @Column()
    refresh_token: string;
}