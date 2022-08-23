import { User } from "src/users/user.entity";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity('kurly.events')
export class Event {
    
    @PrimaryGeneratedColumn()
    eventIdx: number;

    @Column()
    ques1: number;
    
    @Column()
    ques2: number;
    
    @Column()
    ques3: number;
    
    @Column()
    ques4: number;
    
    @Column()
    ques5: number;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date | null;

    @ManyToOne(type => User, user => user.events, { eager: false })
    @JoinColumn({ name: 'user_idx'})
    userIdx: number;
}