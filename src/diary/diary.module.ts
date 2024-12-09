import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

@Module({
  controllers: [DiaryController],
  providers: [DiaryService]
})
export class DiaryModule {}
