import { Router } from 'express';
import AuthenticateUserService from '../service/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService();
  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ token, user });
});

export default sessionRouter;
