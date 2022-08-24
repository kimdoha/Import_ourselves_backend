import { User } from "src/users/user.entity";
import { 
    Column, 
    Double, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Product } from "./product.entity";

@Entity('kurly.rectable')
export class Rectable {
    
    @PrimaryGeneratedColumn()
    rectableIdx: number;

    @Column()
    score: number;

    @ManyToOne(type => User, user => user.rectables, { eager: false })
    @JoinColumn({ name: 'user_idx'})
    userIdx: number;

    @ManyToOne(type => Product, prod => prod.rectables, { eager: false })
    @JoinColumn({ name: 'product_idx'})
    productIdx: number;

}