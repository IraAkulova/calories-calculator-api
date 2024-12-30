import { Module } from '@nestjs/common';
import { DiaryRecordController } from './diary-record.controller';
import { DiaryRecordService } from './diary-record.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [DiaryRecordController],
  providers: [DiaryRecordService],
})
export class DiaryRecordModule {}
