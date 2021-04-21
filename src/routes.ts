import { Router} from 'express'
import { SettingsController } from './controllers/SettingsController'
import { UserController } from './controllers/UserController'

const routes = Router()
const settingController = new SettingsController()
const userController = new UserController()

routes.post('/settings', settingController.save)
routes.get('/settings', settingController.get)

routes.post('/users', userController.save)

export { routes }