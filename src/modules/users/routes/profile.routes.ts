import isAuthenticated from "@shared/http/middleware/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import ProfileController from "../controller/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            oldPassword: Joi.string(),
            password: Joi.string().optional(),
            passwordConfirmation: Joi.string().valid(
                Joi.ref('password'),
                Joi.when('password', {
                    is: Joi.exist(),
                    then: Joi.required()
                }),
            )
        }
    }),
    profileController.update
);

export default profileRouter;
