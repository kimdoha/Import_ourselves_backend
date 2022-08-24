import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Department } from "./department.entity";
import { Rectable } from "./rectable.entity";

@Entity('kurly.products')
export class Product {

    @PrimaryGeneratedColumn()
    productIdx: number;

    @Column()
    productName: string;

    @Column()
    productImg: string | null;

    @Column()
    isOrganic: number;

    @Column()
    hotel: number;

    @Column()
    camping: number;

    @Column()
    make: number;

    @Column()
    instant: number;

    @Column()
    riceLover: number;

    @Column()
    desertLover: number;

    @Column()
    meatLover: number;

    @Column()
    vegetableLover: number;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date | null

    @ManyToOne(type => Department, department => department.products, { eager: false })
    @JoinColumn({ name: 'department_idx'})
    departmentIdx: number;

    @OneToMany(type => Rectable, (rect: Rectable) => rect.productIdx, { eager: false })
    rectables: Rectable[]
}