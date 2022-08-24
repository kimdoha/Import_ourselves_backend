import { User } from "src/users/user.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Department } from "./department.entity";

@Entity('kurly.excepts')
export class Except {
    @PrimaryGeneratedColumn()
    exceptIdx: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date | null;

    @ManyToOne(type => User, user => user.excepts, { eager: false })
    @JoinColumn({ name: 'user_idx'})
    userIdx: number;

    @ManyToOne(type => Department, dept => dept.excepts, { eager: false })
    @JoinColumn({ name: 'department_idx'})
    departmentIdx: number;

}