import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../repositories/ProductRepository"
import Product from "../typeorm/entities/Product";

interface IRequest {
    name: string,
    price: number,
    quantity: number
}

class ListProductService {

    public async execute(): Promise<Product[]> {
        const repository = getCustomRepository(ProductRepository);

        return await repository.find();
    }
}


export default ListProductService;
