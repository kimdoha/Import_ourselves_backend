import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { Event } from "src/events/event.entity";
import { Rectable } from "src/products/rectable.entity";

@Entity('kurly.users')
export class User {

    @PrimaryGeneratedColumn()
    userIdx: number;

    @Column()
    userId: string;

    @Column()
    password: string;

    @Column()
    nickname: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date | null;

    @OneToMany(type => Event, (event: Event) => event.userIdx, { eager: false })
    events: Event[];

    @OneToMany(type => Rectable, (rect: Rectable) => rect.userIdx, { eager: false })
    rectables: Rectable[]


}