import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import SessionController from "../controller/SessionController";

const sessionRouter = Router();
const controller = new SessionController();

sessionRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    controller.create
    );

export default sessionRouter;
