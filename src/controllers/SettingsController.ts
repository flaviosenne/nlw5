import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";


class SettingsController {
    
    async save(req: Request,res: Response) {
        const settingRepository = getCustomRepository(SettingsRepository)
        const { chat, username} = req.body
        
        const settings = settingRepository.create({
            chat,
            username
        })
        console.log("cheguei aqui")
        await settingRepository.save(settings)
        
        return res.status(201).json(settings)
    }
    async get(req: Request,res: Response){
        const settingRepository = getCustomRepository(SettingsRepository)
        const settings = await settingRepository.find()
        return res.status(200).json(settings)
    }
}

export { SettingsController }