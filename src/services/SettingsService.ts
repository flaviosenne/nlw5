import { Repository } from 'typeorm';
import { getCustomRepository } from 'typeorm';
import { Setting } from '../entities/Setting';
import { SettingsRepository } from '../repositories/SettingsRepository';
interface SettingsInterface {
    chat: boolean
    username: string
}

class SettingService {
    private settingRepository: Repository<Setting>

    constructor(){
        this.settingRepository =getCustomRepository(SettingsRepository)
    }
    async save({chat, username}: SettingsInterface){
        const userrAlreadyExists = await this.settingRepository.findOne({
            username
        })

        if(userrAlreadyExists) throw new Error("User Already exists");
        
        const settings = this.settingRepository.create({
            chat,
            username
        })
        console.log("cheguei aqui")
        await this.settingRepository.save(settings)

        return settings
    }

    async get(){
        const settings = await this.settingRepository.find()

        return settings
    }
    async findByUserName(username: string){
        const settings = this.settingRepository.findOne({username})

        return settings
    }
}

export { SettingService}