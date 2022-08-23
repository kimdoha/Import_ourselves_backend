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

}