import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from 'nest-auth-module';
import { Address } from '../addresses/entities/address.entity';
import { Order } from '../orders/entities/order.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { WishlistItem } from '../wishlist/entities/wishlist-item.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      entities: [User, Address, Order, CartItem, WishlistItem],
      synchronize: this.configService.get('NODE_ENV') === 'development',
      logging: false, // Disable database query logging
    };
  }
}
