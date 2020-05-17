import { Router } from 'express';
import ensureAuthenticated from '@modules/user/infra/http/middleware/ensureAuthenticated';
import { Segments, celebrate, Joi } from 'celebrate';
import ProfileController from '../controller/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
