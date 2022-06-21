import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import OrderRepository from "../repository/OrderRepository";
import Order from "../typeorm/entities/Order";

interface IRequest {
    id: string
}

export default class ShowOrderService {
    public async execute({ id }: IRequest): Promise<Order> {
        const repository = getCustomRepository(OrderRepository);
        const order = await repository.findById(id);

        if (!order) {
            throw new AppError('Order not found.', 404);
        }

        return order;
    }
}
