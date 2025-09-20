import { User } from 'nest-auth-module';
export declare class WishlistItem {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
