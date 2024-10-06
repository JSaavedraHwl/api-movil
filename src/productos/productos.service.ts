import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: createProductoDto.categoriaId },
      });
  
      if (!categoria) {
        throw new Error('Categoría no encontrada');
      }
  
      const producto = this.productoRepository.create({
        ...createProductoDto,
        categoria,
        disponible: true
      });
      return await this.productoRepository.save(producto);
    }
    catch(error) {
      throw new HttpException('Error al ejecutar create en ProductosService', 400);
    }
  }

  async findAll() {
    try {
      const productos = await this.productoRepository.find();
      return productos;
    }
    catch(error) {
      throw new HttpException('Error en findAll en productosService', 400);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
