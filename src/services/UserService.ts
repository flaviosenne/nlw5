import { Repository } from 'typeorm';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

class UserService {
    private userRepository: Repository<User>

    constructor(){
        this.userRepository = getCustomRepository(UserRepository)
    }
    async save(email: string){
        const existUser = await this.userRepository.findOne({email})

        if(existUser) return existUser

        const user = this.userRepository.create({email})

        await this.userRepository.save(user)

        return user
    }
    async findByEmail(email: string){
        const existUser = await this.userRepository.findOne({email})

        if(existUser) return existUser

        return null
    }
}

export { UserService}