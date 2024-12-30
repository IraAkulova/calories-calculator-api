import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product.dto';
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search products by query' })
  @ApiOkResponse({
    description: 'Array of products',
    type: ProductResponseDto,
  })
  @Get('')
  getProducts(@Query('query') query: string) {
    return this.productService.getProducts(query);
  }
}
