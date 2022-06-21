import isAuthenticated from "@shared/http/middleware/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import OrderController from "../controller/OrderController";

const ordersRouter = Router();
const ordersController = new OrderController();

ordersRouter.use(isAuthenticated);
ordersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    ordersController.show
);

ordersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required()
        }
    }),
    ordersController.create
);

export default ordersRouter;
