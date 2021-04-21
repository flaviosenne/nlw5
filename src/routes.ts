import { Router} from 'express'
import { MessageController } from './controllers/MessageController'
import { SettingsController } from './controllers/SettingsController'
import { UserController } from './controllers/UserController'

const routes = Router()
const settingController = new SettingsController()
const userController = new UserController()
const messageController = new MessageController()

routes.post('/settings', settingController.save)
routes.get('/settings', settingController.get)

routes.post('/users', userController.save)

routes.post('/messages', messageController.save)
routes.get('/messages/:id', messageController.showByUser)

export { routes }