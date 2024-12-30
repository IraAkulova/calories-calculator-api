import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DiaryRecordService {
  constructor(private prisma: PrismaService) {}
  async createDiaryRecord(data: {
    productId: number;
    weight: number;
    userId: number;
  }) {
    const { productId, weight, userId } = data;
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    await this.prisma.diaryRecord.create({
      data: {
        weight,
        user: {
          connect: { id: userId },
        },
        product: {
          connect: { id: product.id },
        },
      },
    });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const dailyRecords = await this.prisma.diaryRecord.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        product: true,
      },
    });

    const dailyDiary = dailyRecords.map((record) => {
      return {
        id: record.id,
        weight: record.weight,
        product: {
          id: record.product.id,
          name: record.product.name,
          calories: (record.product.calories * (record.weight / 100)).toFixed(
            2,
          ),
          protein: (record.product.protein * (record.weight / 100)).toFixed(2),
          fat: (record.product.fat * (record.weight / 100)).toFixed(2),
          carbs: (record.product.carbs * (record.weight / 100)).toFixed(2),
        },
      };
    });

    return dailyDiary;
  }

  async getDiaryRecords(userId: number) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const dailyRecords = await this.prisma.diaryRecord.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        product: true,
      },
    });

    const dailyDiary = dailyRecords.map((record) => {
      return {
        id: record.id,
        weight: record.weight,
        product: {
          id: record.product.id,
          name: record.product.name,
          calories: (record.product.calories * (record.weight / 100)).toFixed(
            2,
          ),
          protein: (record.product.protein * (record.weight / 100)).toFixed(2),
          fat: (record.product.fat * (record.weight / 100)).toFixed(2),
          carbs: (record.product.carbs * (record.weight / 100)).toFixed(2),
        },
      };
    });

    return dailyDiary;
  }
}
