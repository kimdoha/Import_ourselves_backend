import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Department } from "./department.entity";

@Entity('kurly.products')
export class Product {

    @PrimaryGeneratedColumn()
    productIdx: number;

    @Column()
    productName: string;

    @Column()
    productImg: Text | null;

    @Column()
    isOrganic: Boolean;

    @Column()
    hotel: Boolean;

    @Column()
    camping: Boolean;

    @Column()
    make: Boolean;

    @Column()
    instant: Boolean;

    @Column()
    riceLover: Boolean;

    @Column()
    desertLover: Boolean;

    @Column()
    meatLover: Boolean;

    @Column()
    vegetableLover: Boolean;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date | null

    @ManyToOne(type => Department, department => department.products, { eager: false })
    @JoinColumn({ name: 'department_idx'})
    departmentIdx: number;
}