import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Address } from '../../addresses/entities/address.entity';
import { Order } from '../../orders/entities/order.entity';
import { CartItem } from '../../cart/entities/cart-item.entity';
import { WishlistItem } from '../../wishlist/entities/wishlist-item.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @Column({ nullable: true })
  emailVerificationCode: string;

  @Column({ nullable: true, type: 'timestamptz' })
  emailVerificationCodeExpires: Date;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  passwordResetExpires: Date;

  @Column({ nullable: true })
  passwordResetCode: string;

  @Column({ nullable: true, type: 'timestamptz' })
  passwordResetCodeExpires: Date;

  // User preferences
  @Column({ default: 'en' })
  language: string;

  @Column({ default: true })
  notificationsEnabled: boolean;

  @Column({ nullable: true })
  location: string;

  @Column({ default: 'light' })
  theme: string;

  // Soft delete fields
  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true, type: 'timestamptz' })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.user)
  wishlistItems: WishlistItem[];

  // Virtual fields
  get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
}
