import { 
    Column, 
    CreateDateColumn, 
    Entity, 
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
}