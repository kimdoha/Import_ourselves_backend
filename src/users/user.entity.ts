import { Event } from "src/events/event.entity";
import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity('kurly.users')
export class User {

    @PrimaryGeneratedColumn()
    userIdx: number;

    @Column()
    id: string;

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