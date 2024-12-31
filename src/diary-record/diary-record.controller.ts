import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DiaryRecordService } from './diary-record.service';
import { GetUser } from '../auth/decorator';
import { DiaryRecordDto, DiaryRecordResponseDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
@Controller('diary-record')
export class DiaryRecordController {
  constructor(private diaryRecordService: DiaryRecordService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add diary record' })
  @ApiOkResponse({
    description: 'Detailed diary record information',
    type: DiaryRecordResponseDto,
  })
  @Post('')
  async createDiaryRecord(
    @GetUser('id') userId: number,
    @Body() dto: DiaryRecordDto,
  ) {
    if (!userId) {
      throw new Error('User ID not found');
    }
    const { weight, productId } = dto;
    const data = { weight, userId, productId };
    return this.diaryRecordService.createDiaryRecord(data);
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get daily records' })
  @ApiOkResponse({
    description: 'List of daily diary records',
    type: [DiaryRecordResponseDto],
  })
  @Get('')
  async getDiaryRecords(@GetUser('id') userId: number) {
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.diaryRecordService.getDiaryRecords(userId);
  }
}
