import { getCustomRepository } from "typeorm";
import CustomerRepository from "../repository/CustomerRepository";
import Customer from "../typeorm/entities/Customer";

export default class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const repository = getCustomRepository(CustomerRepository);

        return await repository.find();
    }
}
