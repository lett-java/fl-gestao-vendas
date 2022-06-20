import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import CustomerRepository from "../repository/CustomerRepository"

interface IRequest {
    id: string
}

export default class DeleteCustomerService {
    public async execute(request: IRequest): Promise<void> {
        const repository = getCustomRepository(CustomerRepository);
        const customer = await repository.findOne(request.id);

        if (!customer) {
            throw new AppError('Customer not found.', 404)
        }

        await repository.remove(customer);
    }
}
