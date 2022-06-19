import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/UserRepository";
import User from "../typeorm/entities/User";

interface IRequest {
    userId: string
}

class ShowProfileService {
    public async execute({ userId }: IRequest): Promise<User>{
        const repository = getCustomRepository(UserRepository);
        const user = await repository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }
}

export default ShowProfileService;
