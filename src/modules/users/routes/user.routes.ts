import { celebrate, Segments } from "celebrate";
import multer from 'multer';
import uploadConfig from '@config/upload';
import { Router } from "express";
import Joi from "joi";
import UserController from "../controller/UserController";
import isAuthenticated from "../../../shared/http/middleware/isAuthenticated";
import UserAvatarController from "../controller/UserAvatarController";

const userRouter = Router();
const controller = new UserController();
const avatarController = new UserAvatarController();
const upload = multer(uploadConfig);

userRouter.get('/', isAuthenticated, controller.index);

userRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    controller.create
);

userRouter.patch(
    "/avatar",
    isAuthenticated,
    upload.single('avatar'),
    avatarController.update
);

export default userRouter;
