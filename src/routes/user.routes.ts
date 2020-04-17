import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../service/CreateUserService';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import uploadConfig from '../config/upload';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.patch(
  '/avatars',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      filename: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  },
);

export default userRouter;
