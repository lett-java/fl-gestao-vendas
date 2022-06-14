import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../repository/ProductRepository"
import Product from "../typeorm/entities/Product";

class ListProductService {

    public async execute(): Promise<Product[]> {
        const repository = getCustomRepository(ProductRepository);

        return await repository.find();
    }
}


export default ListProductService;
