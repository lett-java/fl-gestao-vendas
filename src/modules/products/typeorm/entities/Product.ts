import OrdersProducts from "@modules/orders/typeorm/entities/OrdersProducts";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @OneToMany(() => OrdersProducts, orderProducts => orderProducts.product, {
        cascade: true
    })
    orderProducts: OrdersProducts[];

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;


}

export default Product;
