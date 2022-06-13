import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../repositories/ProductRepository"
import Product from "../typeorm/entities/Product";

interface IRequest {
    name: string,
    price: number,
    quantity: number
}

class CreateProductService {

    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const repository = getCustomRepository(ProductRepository);
        const productExists = await repository.findByName(name);

        if (productExists) {
            throw new AppError('there is already one product with this name', 400);
        }

        const product = repository.create({
            name,
            price,
            quantity
        });

        return await repository.save(product);

    }
}


export default CreateProductService;
