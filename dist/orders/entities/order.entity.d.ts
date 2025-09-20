import { User } from 'nest-auth-module';
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
    RETURNED = "returned"
}
export declare class Order {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    totalAmount: number;
    shippingCost: number;
    taxAmount: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
