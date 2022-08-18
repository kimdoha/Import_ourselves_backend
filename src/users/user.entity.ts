import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity('kurly.users')
export class User {

    @PrimaryGeneratedColumn()
    userIdx: number

    @Column()
    id: string

    @Column()
    password: string

    @Column()
    nickname: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date | null


}