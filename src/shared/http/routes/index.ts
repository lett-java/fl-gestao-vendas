import productRouter from '@modules/products/routes/product.routes';
import userRouter from '@modules/users/routes/user.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/product', productRouter);
routes.use('/user', userRouter);
routes.use('/session', sessionRouter);

export default routes;
