import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { SettingService } from "../services/SettingsService";


class SettingsController {
    
    async save(req: Request,res: Response) {
        const { chat, username} = req.body
        
        const settingsService =  new SettingService()
        
        try{
            const settings = await settingsService.save({chat, username})
            return res.status(201).json(settings)
        }catch(err){
            return res.status(400).json({msg: err.message})
        }  

    }
    async get(req: Request,res: Response){
        return res.status(200).json(await new SettingService().get())
    }
}

export { SettingsController }