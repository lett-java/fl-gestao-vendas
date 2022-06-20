import isAuthenticated from "@shared/http/middleware/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import CustomerController from "../controller/CustomerController";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.use(isAuthenticated);
customerRouter.get('/', customerController.index);

customerRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    customerController.show
)

customerRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        }
    }),
    customerController.create
)

customerRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required()
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    customerController.update
)

customerRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    customerController.delete
)

export default customerRouter;
