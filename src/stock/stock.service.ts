import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const producto = await this.productoRepository.findOne({
      where: { id: createStockDto.productoId },
    });

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const stock = this.stockRepository.create({
      ...createStockDto,
      producto,
    });
    return await this.stockRepository.save(stock);
  }

  findAll() {
    return `This action returns all stock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
