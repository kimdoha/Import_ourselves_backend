import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('kurly.products')
export class Product {

    @PrimaryGeneratedColumn()
    productIdx: number;

    @Column()
    categoryIdx: number;

    @Column()
    product: string;

    @Column()
    productImg: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date | null
}