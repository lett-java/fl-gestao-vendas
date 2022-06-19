import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/UserRepository";
import User from "../typeorm/entities/User";

interface IRequest {
    userId: string,
    name: string,
    email: string,
    password?: string,
    oldPassword?: string
}

class UpdateProfileService {
    public async execute(request: IRequest): Promise<User> {
        const repository = getCustomRepository(UserRepository);
        const user = await repository.findById(request.userId);

        if (!user) {
            throw new AppError('User not found.', 404);
        }

        const userUpdateEmail = await repository.findByEmail(request.email);

        if (userUpdateEmail && userUpdateEmail.id !== request.userId) {
            throw new AppError('There is already one user with this email.', 400);
        }

        if (request.password && !request.oldPassword) {
            throw new AppError('Old password is required.', 400);
        }

        if (request.password && request.oldPassword) {
            const checkOldPassword = await compare(request.oldPassword, user.password);

            if (!checkOldPassword) {
                throw new AppError('Old password does not match', 400);
            }

            user.password = await hash(request.password, 8);
        }

        user.name = request.name;
        user.email = request.email;

        return await repository.save(user);
    }
}

export default UpdateProfileService;
