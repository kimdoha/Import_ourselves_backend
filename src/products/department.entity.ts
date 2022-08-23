import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

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
}