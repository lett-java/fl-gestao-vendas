import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/UserRepository";
import User from "../typeorm/entities/User";

interface IRequest {
    name: string,
    email: string,
    password: string,
}

class CreateUserService {

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const repository = getCustomRepository(UserRepository);
        const emailExists = await repository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used', 400);
        }

        const hashedPassword = await hash(password, 8);

        const user = repository.create({ name, email, password: hashedPassword });

        return await repository.save(user);
    }
}

export default CreateUserService;
