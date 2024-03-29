import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import {v4  as uuid} from 'uuid'
import { User } from "./User"


@Entity('message')
class Message {
    @PrimaryColumn()
    id: string

    @Column()
    text: string
    
    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User)
    user: User
    
    @Column()
    user_id: string
    
    @Column()
    admin_id: string
    
    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id) this.id = uuid()
    }
}

export { Message}