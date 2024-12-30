import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { PRODUCTS_API_URL } from '../utils/constants';
import { ConfigService } from '@nestjs/config';
import { transformFoodResponse } from '../utils/transformFoodResponse';
import { PrismaService } from '../prisma/prisma.service';
import { getAccessToken, isTokenExpired } from '../utils/fatSecretAuth';
@Injectable()
export class ProductService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}
  async getProducts(query: string): Promise<any> {
    if (!query) {
      throw new InternalServerErrorException('Query is missing');
    }
    const accessToken = this.config.get<string>('FATSECRET_ACCESS_TOKEN');
    if (!accessToken) {
      throw new InternalServerErrorException(
        'Products access token is missing',
      );
    }
    const isFatSecretTokenExpired = isTokenExpired();
    if (isFatSecretTokenExpired) {
      await getAccessToken();
    }
    try {
      const response = await axios.post(
        PRODUCTS_API_URL,
        `method=foods.search&search_expression=${query}&max_results=50&format=json`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!response.data.foods) {
        throw new InternalServerErrorException('Failed to fetch products');
      }
      const transformedResponse = transformFoodResponse(response.data);
      await this.saveProductsToDb(transformedResponse);
      return { products: transformedResponse };
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  private async saveProductsToDb(products: any) {
    {
      try {
        for (const product of products) {
          const productExists = await this.prisma.product.findFirst({
            where: { name: product.name },
          });
          if (productExists) {
            continue;
          }

          await this.prisma.product.create({
            data: {
              name: product.name,
              calories: product.calories,
              fat: product.fat,
              carbs: product.carbs,
              protein: product.protein,
            },
          });
        }
      } catch (error) {
        console.error(
          'Failed to save products to the database:',
          error.message,
        );
        throw new InternalServerErrorException(
          'Failed to save products to the database',
        );
      }
    }
  }
}
