import { Repository, getCustomRepository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionRepository } from '../repositories/ConnectionRepository';

interface ConnectionInterface{
    socket_id: string
    user_id: string
    admin_id?: string
    id?:string
}

class ConnectionService {
    private connectionRepository: Repository<Connection>

    constructor() {
        this.connectionRepository = getCustomRepository(ConnectionRepository)
    }

    async save({socket_id,user_id,admin_id,id}: ConnectionInterface){
        const connection = this.connectionRepository.create({
            socket_id,
            user_id,
            admin_id, 
            id
        })
        this.connectionRepository.save(connection)
        return connection
    }
    async findByUserId(id: string){
        const connection = this.connectionRepository.findOne({user_id: id})

        if(connection) return connection

        return null
    }
    
    async findAllWithoutAdmin(){
        const connections = await this.connectionRepository.find({
            where: {admin_id: null},
            relations: ['user']
        })

        return connections
    }

    async findBySocketId(socket_id: string){
        const connetion = await this.connectionRepository.findOne({socket_id})

        return connetion
    }

    async updateAdminId(user_id: string, admin_id: string){
        await this.connectionRepository.
        createQueryBuilder().update(Connection)
        .set({admin_id})
        .where("user_id = :user_id", {user_id}).execute()

    }
}

export { ConnectionService }