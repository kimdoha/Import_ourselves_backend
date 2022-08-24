import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Except } from "./except.entity";
import { Product } from "./product.entity";

@Entity('kurly.departments')
export class Department {

    @PrimaryGeneratedColumn()
    departmentIdx: number;
    
    @Column()
    department: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date | null;

    @OneToMany(type => Product, (product: Product) => product.departmentIdx, { eager: false })
    products: Product[];

    @OneToMany(type => Except, (except: Except) => except.departmentIdx, { eager: false })
    excepts: Except[];
}