import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/UserRepository";
import User from "../typeorm/entities/User";

class ListUserService {

    public async execute(): Promise<User[]> {
        const repository = getCustomRepository(UserRepository);

        return await repository.find();
    }
}

export default ListUserService;
