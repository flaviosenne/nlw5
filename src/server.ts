import { http as server} from './app'
import './websocket/client'
import './websocket/admin'

server.listen(3000, ()=> console.info('server running in port 3000'))