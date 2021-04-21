import { Response } from 'express';
import { Request } from 'express';
import { MessageService } from '../services/MessageService';
class MessageController {
    async save(req:Request, res: Response){
        const {text, user_id, admin_id} = req.body

        const messageService = new MessageService()
        
        const message = await messageService.save({
            text,
            user_id,
            admin_id
        })
        return res.status(201).json(message)
    }

    async showByUser(req:Request, res: Response){
        const {id} = req.params
        
        const messageService = new MessageService()

        const list = await messageService.listByUser(id)

        return res.status(200).json(list)


    }
}

export { MessageController}