import { Router } from 'express';
import CreateUserService from '../service/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    return response.json(
      await createUserService.execute({ name, email, password }),
    );
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
