import { UserController, UserValidator } from "@modules/users";
import { Router } from "express";
import { container } from "src/inversify.dependencies";

const router: Router = Router();
const userController = container.get<UserController>('UserController');
const userValidator = container.get<UserValidator>('UserValidator');

/**
 * Add one user.
 */
router.post(
  '/',
  // AuthMiddleware.authenticate,
  userValidator.validateCreateUser.bind(userValidator),
  userController.createUser.bind(userController),
);

/**
 * Get one user.
 */
router.get(
  '/:userId',
  // AuthMiddleware.authenticate,
  userValidator.validateUserRetriever.bind(userValidator),
  userController.getUser.bind(userController),
);

export default router;
