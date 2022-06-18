import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from 'path';
import UserRepository from "../repository/UserRepository";
import UserTokenRepository from "../repository/UserTokenRepository";
import EtherealMail from '@config/mail/EtherealMail';

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

        const { token } = await userTokenRepository.generate(user.id);
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'view', 'forgot_password.hbs');

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[API Vendas] Recover Password',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                }
            }
        });
    }
}

export default sendForgotPasswordEmailService;
