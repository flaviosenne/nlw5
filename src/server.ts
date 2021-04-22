import { http as server} from './app'
import './websocket/client'

server.listen(3000, ()=> console.info('server running in port 3000'))