import { io} from '../app'
import { ConnectionService} from '../services/ConnectionService'
import { UserService} from '../services/UserService'
import { MessageService} from '../services/MessageService'

io.on('connect', (socket) => {
    const connectionService = new ConnectionService()
    const userService = new UserService()
    const messageService = new MessageService()
    
    socket.on('client_first_access', async params =>{
        let user_id = null
        const socket_id = socket.id

        const { text, email} = params

        const existUser = await userService.findByEmail(email)

        if(!existUser){
            const user = await userService.save(email)
           
            user_id = user.id
            await connectionService.save({socket_id, user_id})
        }
        else{
            user_id = existUser.id
            const connection = await connectionService.findByUserId(existUser.id)
            
            if(!connection){
                await connectionService.save({socket_id,user_id})
            }   
            connection.socket_id = socket.id
            
            await connectionService.save(connection)
            
            await messageService.save({text, user_id })
        }

        const allMessages = await messageService.listByUser(user_id)

        socket.emit('client_list_all_messages', allMessages)

        const allUsers = await connectionService.findAllWithoutAdmin()
        io.emit('admin_list_all_users', allUsers)
    })

    socket.on('client_send_to_admin', async params => {
        const {text, socket_admin_id} = params

        const { user_id} = await connectionService.findBySocketId(socket.id)
        const socket_id = socket.id
        const message = await messageService.save({text, user_id})

        io.to(socket_admin_id).emit('admin_receive_message', {
            message,
            socket_id
        })
    })

})