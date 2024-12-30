import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ description: 'Id', example: '1' })
  id: string;
  @ApiProperty({ description: 'Name', example: 'Egg' })
  name: string;
  @ApiProperty({ description: 'Calories', example: 100 })
  calories: number;
  @ApiProperty({ description: 'Fat', example: 15 })
  fat: number;
  @ApiProperty({ description: 'Carbs', example: 10 })
  carbs: number;
  @ApiProperty({ description: 'Protein', example: 15 })
  protein: number;
}
