import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { DiaryRecordModule } from './diary-record/diary-record.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AnalyticsModule,
    ProductModule,
    PrismaModule,
    DiaryRecordModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
