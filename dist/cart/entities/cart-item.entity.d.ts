import { User } from 'nest-auth-module';
export declare class CartItem {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
