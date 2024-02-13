import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}