import { Address } from '../../addresses/entities/address.entity';
import { Order } from '../../orders/entities/order.entity';
import { CartItem } from '../../cart/entities/cart-item.entity';
import { WishlistItem } from '../../wishlist/entities/wishlist-item.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    phone: string;
    role: UserRole;
    isActive: boolean;
    isEmailVerified: boolean;
    emailVerificationToken: string;
    emailVerificationCode: string;
    emailVerificationCodeExpires: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;
    passwordResetCode: string;
    passwordResetCodeExpires: Date;
    language: string;
    notificationsEnabled: boolean;
    location: string;
    theme: string;
    isDeleted: boolean;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    addresses: Address[];
    orders: Order[];
    cartItems: CartItem[];
    wishlistItems: WishlistItem[];
    get fullName(): string;
}
