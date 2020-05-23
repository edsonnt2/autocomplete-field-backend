import { Router } from 'express';
import UserControllers from '../controllers/UserControllers';
import CategoryControllers from '../controllers/CategoryControllers';

const routes = Router();

const userControllers = new UserControllers();
const categoryControllers = new CategoryControllers();

routes.post('/users', userControllers.create);
routes.get('/users', userControllers.index);
routes.get('/categories', categoryControllers.index);

export default routes;
