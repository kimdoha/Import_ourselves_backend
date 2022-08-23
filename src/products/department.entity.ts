import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
}