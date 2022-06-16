import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns';
import UserRepository from "../repository/UserRepository";
import UserTokenRepository from "../repository/UserTokenRepository";
import { hash } from "bcryptjs";

interface IRequest {
    token: string,
    password: string
}

class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const tokenRepository = getCustomRepository(UserTokenRepository);

        const userToken = await tokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User Token does not exists.', 404);
        }

        const user = await userRepository.findById(userToken.userId);

        if (!user) {
            throw new AppError('User does not exists', 404);
        }

        const tokenCreatedAt = userToken.createdAt;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.', 400);
        }

        user.password = await hash(password, 8);


    }
}

export default ResetPasswordService;
