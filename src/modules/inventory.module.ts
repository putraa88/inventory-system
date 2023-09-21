import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryController } from 'src/controllers/inventory.controller';
import { History, HistorySchema } from 'src/databases/mongoDB/entities/history.model';
import { Inventory, InventorySchema } from 'src/databases/mongoDB/entities/inventory.model';
import { InventoryService } from 'src/services/inventory.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Inventory.name, schema: InventorySchema },
        { name: History.name, schema: HistorySchema }
      ],
    ),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
