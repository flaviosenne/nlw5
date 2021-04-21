import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
interface SettingsInterface {
    chat: boolean
    username: string
}

class SettingService {
    async save({chat, username}: SettingsInterface){
        const settingRepository = getCustomRepository(SettingsRepository)
        
        const userrAlreadyExists = await settingRepository.findOne({
            username
        })

        if(userrAlreadyExists) throw new Error("User Already exists");
        

        const settings = settingRepository.create({
            chat,
            username
        })
        console.log("cheguei aqui")
        await settingRepository.save(settings)

        return settings
    }

    async get(){
        const settingRepository = getCustomRepository(SettingsRepository)

        const settings = await settingRepository.find()

        return settings
    }
}

export { SettingService}