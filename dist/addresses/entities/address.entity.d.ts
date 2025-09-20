import { User } from 'nest-auth-module';
export declare class Address {
    id: string;
    title: string;
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
