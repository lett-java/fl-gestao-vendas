import productRouter from '@modules/products/routes/product.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/product', productRouter)

export default routes;
