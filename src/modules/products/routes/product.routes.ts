import { Router } from "express";
import ProductController from "../controller/ProductController";
import { celebrate, Joi, Segments } from 'celebrate';

const productRouter = Router();
const controller = new ProductController();

productRouter.get('/', controller.index);

productRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    controller.show
);

productRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        }
    }),
    controller.create
    );

productRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        }
    }),
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    controller.update
    );

productRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    controller.delete
    );


export default productRouter;
