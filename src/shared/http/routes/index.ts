import productRouter from '@modules/products/routes/product.routes';
import userRouter from '@modules/users/routes/user.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import { Router } from 'express';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import customerRouter from '@modules/customers/routes/customer.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';

const routes = Router();
routes.use('/product', productRouter);
routes.use('/user', userRouter);
routes.use('/session', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customer', customerRouter);
routes.use('/order', ordersRouter)

export default routes;
