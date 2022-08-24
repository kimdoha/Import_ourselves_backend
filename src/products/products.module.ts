import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/event.entity';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Rectable } from './entities/rectable.entity';
import { Except } from './entities/except.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, Rectable, Event, Except]),
    UsersModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
