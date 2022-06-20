import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../repository/CustomerRepository";
import Customer from "../typeorm/entities/Customer";

interface IRequest {
    id: string;
    name: string,
    email: string
}

export default class UpdateCustomerService {
    public async execute(request: IRequest): Promise<Customer> {
        const repository = getCustomRepository(CustomerRepository);

        const customer = await repository.findOne(request.id);
        if (!customer) {
            throw new AppError('Customer not found.', 404);
        }

        const customerUpdateEmail = await repository.findByEmail(request.email);
        if (customerUpdateEmail && customerUpdateEmail.id !== request.id) {
            throw new AppError('There is already one customer with this e-mail.', 400);
        }

        customer.name = request.name;
        customer.email = request.email;

        return await repository.save(customer);

    }
}
