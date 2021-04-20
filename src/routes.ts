import { Router} from 'express'
import { SettingsController } from './controllers/SettingsController'

const routes = Router()
const settingController = new SettingsController()

routes.post('/settings', settingController.save)
routes.get('/settings', settingController.get)

export { routes }