import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from 'src/controllers/history.controller';
import { History, HistorySchema } from 'src/databases/mongoDB/entities/history.model';
import { HistoryService } from 'src/services/history.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature(
      [{ name: History.name, schema: HistorySchema }]
    )
    ],
    controllers: [HistoryController],
    providers: [HistoryService],
  })
  export class HistoryModule {}
