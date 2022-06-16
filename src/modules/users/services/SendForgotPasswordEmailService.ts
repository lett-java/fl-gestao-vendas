import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/UserRepository";
import UserTokenRepository from "../repository/UserTokenRepository";

interface IRequest {
    email: string;
}

class sendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const repository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokenRepository);

        const user = await repository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.', 404);
        }

        const token = await userTokenRepository.generate(user.id);

        console.log(token);
    }
}

export default sendForgotPasswordEmailService;
