import CustomerRepository from "@modules/customers/repository/CustomerRepository";
import { ProductRepository } from "@modules/products/repository/ProductRepository";
import Product from "@modules/products/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import OrderRepository from "../repository/OrderRepository";
import Order from "../typeorm/entities/Order";

interface IProduct {
    id: string;
    quantity: number;
  }

  interface IRequest {
    customer_id: string;
    products: IProduct[];
  }

 export default class CreateOrderService {
    public async execute(request: IRequest): Promise<Order> {
      const ordersRepository = getCustomRepository(OrderRepository);
      const customersRepository = getCustomRepository(CustomerRepository);
      const productsRepository = getCustomRepository(ProductRepository);

      const customerExists = await customersRepository.findById(request.customer_id);

      if (!customerExists) {
        throw new AppError('Could not find any customer with the given id.', 404);
      }

      const existsProducts = await productsRepository.findAllByIds(request.products);

      if (!existsProducts.length) {
        throw new AppError('Could not find any products with the given ids.', 404);
      }

      const existsProductsIds = existsProducts.map(product => product.id);

      const checkInexistentProducts = request.products.filter(
        product => !existsProductsIds.includes(product.id),
      );

      if (checkInexistentProducts.length) {
        throw new AppError(
          `Could not find product ${checkInexistentProducts[0].id}.`, 404
        );
      }

      const quantityAvailable = request.products.filter(
        product =>
          existsProducts.filter(p => p.id === product.id)[0].quantity <
          product.quantity,
      );

      if (quantityAvailable.length) {
        throw new AppError(
          `The quantity ${quantityAvailable[0].quantity}
           is not available for ${quantityAvailable[0].id}.`, 400
        );
      }

      const serializedProducts = request.products.map(product => ({
        product_id: product.id,
        quantity: product.quantity,
        price: existsProducts.filter(p => p.id === product.id)[0].price,
      }));

      const order = await ordersRepository.createOrder({
        customer: customerExists,
        products: serializedProducts,
      });

      serializedProducts.forEach(async product => {
        const productToUpdate = await productsRepository.findById(product.product_id);
        if (productToUpdate !== undefined) {
            productToUpdate.quantity = productToUpdate.quantity - product.quantity;
            await productsRepository.save(productToUpdate);
        }
    });

      return order;
    }
  }
