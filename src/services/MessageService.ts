import { Repository } from 'typeorm';
import { getCustomRepository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessageRepository } from '../repositories/MessageRepository';

interface MessageInterface {
    admin_id? : string
    text: string
    user_id: string
}

class MessageService {
    private messageRepository: Repository<Message>

    constructor(){
        this.messageRepository = getCustomRepository(MessageRepository)
    }

    async save({admin_id, text, user_id}: MessageInterface){
        
        const message = this.messageRepository.create({
            admin_id,
            text,
            user_id
        })
        
        await this.messageRepository.save(message)
        
        return message
    }
    
    async listByUser(user_id: string){
        
        const list = this.messageRepository.find({
            relations: ['user'],
            where: {user_id}}
            )

        return list
    }
}

export { MessageService}