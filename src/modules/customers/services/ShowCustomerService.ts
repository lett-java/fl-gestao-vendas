import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../repository/CustomerRepository";
import Customer from "../typeorm/entities/Customer";

export default class ShowCustomerService {
    public async execute(id: string): Promise<Customer> {
        const repository = getCustomRepository(CustomerRepository);
        const customer = await repository.findOne(id);

        if (!customer) {
            throw new AppError('Customer not found.', 404);
        }

        return customer;
    }
}
