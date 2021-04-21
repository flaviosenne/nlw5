import { Response } from 'express';
import { Request } from 'express';
import { UserService } from '../services/UserService';
class UserController {
    async save(req: Request, res: Response): Promise<Response>{
        const { email} =req.body

        const userService = new UserService()

        const user = await userService.save(email)

        return res.status(201).json(user)
    }
}

export { UserController}