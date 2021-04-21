import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserService {
    async save(email: string){
        const userRepository = getCustomRepository(UserRepository)
    
        const existUser = await userRepository.findOne({email})

        console.log('--',existUser)
        if(existUser) return existUser

        const user = userRepository.create({email})

        await userRepository.save(user)

        return user
    }
}

export { UserService}