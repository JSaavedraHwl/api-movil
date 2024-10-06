import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { CategoriaModule } from './categoria/categoria.module';
import { StockModule } from './stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos/entities/producto.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { Stock } from './stock/entities/stock.entity';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { ProductosController } from './productos/productos.controller';
import { StockController } from './stock/stock.controller';
import { ProductosService } from './productos/productos.service';
import { StockService } from './stock/stock.service';

@Module({
  imports: [
    ProductosModule,
    CategoriaModule,
    StockModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'tienda_bicicletas.db',
      entities: [Producto, Categoria, Stock],
      synchronize: true
    }),
  ],
  controllers: [],
})
export class AppModule { }
