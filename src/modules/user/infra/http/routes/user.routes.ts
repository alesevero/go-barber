import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/user/infra/http/middleware/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UserAvatarController from '@modules/user/infra/http/controller/UserAvatarController';
import UserController from '@modules/user/infra/http//controller/UserController';

const userRouter = Router();
const upload = multer(uploadConfig);
const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRouter.post('/', userController.create);

userRouter.patch(
  '/avatars',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRouter;
