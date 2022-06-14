import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../repository/ProductRepository"
import Product from "../typeorm/entities/Product";

interface IRequest {
    id: string,
    name: string,
    price: number,
    quantity: number
}

class UpdateProductService {

    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const repository = getCustomRepository(ProductRepository);
        const product = await repository.findOne(id);

        if (!product) {
            throw new AppError('Product not found', 404)
        }

        if (await repository.findByName(name) && name !== product.name) {
            throw new AppError('there is already one product with this name', 400);
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        return await repository.save(product);
    }
}


export default UpdateProductService;
