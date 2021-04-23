import {io} from '../app'
import {ConnectionService}from '../services/ConnectionService' 

io.on('connect', async socket => {
    const connectionService = new ConnectionService()
    const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin()

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin)
})