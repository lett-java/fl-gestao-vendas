import productRouter from '@modules/products/routes/product.routes';
import userRouter from '@modules/users/routes/user.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import { Router } from 'express';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';

const routes = Router();
routes.use('/product', productRouter);
routes.use('/user', userRouter);
routes.use('/session', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter)

export default routes;
