import AppError from "@shared/errors/AppError";
import path from 'path';
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/UserRepository";
import User from "../typeorm/entities/User";
import uploadConfig from '@config/upload';
import fs  from "fs";

interface IRequest {
    userId: string,
    avatarFilename: string,
}

class UpdateUserAvatarService {
    public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
        const repository = getCustomRepository(UserRepository);
        const user = await repository.findById(userId);

        if (!user) {
            throw new AppError('User not found.', 404);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        return await repository.save(user)
    }
}

export default UpdateUserAvatarService;
