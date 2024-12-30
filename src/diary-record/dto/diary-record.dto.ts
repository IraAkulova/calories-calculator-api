import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { ProductResponseDto } from '../../product/dto';

export class DiaryRecordDto {
  @ApiProperty({ description: 'Portion weight', example: 150 })
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}

export class DiaryRecordResponseDto {
  @ApiProperty({ description: 'Record id', example: 1 })
  id: number;

  @ApiProperty({ description: 'Portion weight', example: 150 })
  weight: number;

  @ApiProperty({ description: 'Product ID', example: 1 })
  productId: number;

  @ApiProperty({ description: 'Product information' })
  product: ProductResponseDto;
}
