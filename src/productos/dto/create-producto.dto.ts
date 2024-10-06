import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateProductoDto {
    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
    @IsNumber()
    @Type(()=> Number)
    precio: number;
    @IsNumber()
    @Type(()=> Number)
    categoriaId: number; // ID de la categoría a la que pertenece el producto
    @IsBoolean()
    disponible: boolean;
    @IsString()
    urlImagen: string;
  }