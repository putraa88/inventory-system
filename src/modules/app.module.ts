import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryModule } from './inventory.module';
import { ConfigModule } from '@nestjs/config';
import { HistoryModule } from './history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    InventoryModule,
    HistoryModule,
  ],
})
export class AppModule {}
