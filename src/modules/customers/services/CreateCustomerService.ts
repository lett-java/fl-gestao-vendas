import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../repository/CustomerRepository";
import Customer from "../typeorm/entities/Customer";

interface IRequest {
    name: string,
    email: string
}

export default class CreateCustomerService {
    public async execute(request: IRequest): Promise<Customer> {
        const repository = getCustomRepository(CustomerRepository);
        const emailExists = await repository.findByEmail(request.email);

        if (emailExists) {
            throw new AppError('E-mail already registered, please try a new one.', 400);
        }

        const customer = repository.create(request);

        return await repository.save(customer);
    }
}
