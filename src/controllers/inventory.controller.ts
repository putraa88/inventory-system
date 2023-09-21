import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { InsertInventoryPayloadVm, UpdateInventoryPayloadVm } from 'src/dto/inventory.dto';
import { AuthGuard } from 'src/middlewares/authentication.middleware';
import { InventoryService } from 'src/services/inventory.service';

@Controller('inventory')
@UseGuards(AuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':inventoryNumber')
  @HttpCode(HttpStatus.OK)
  findOneByInventoryNumber(
    @Param('inventoryNumber') inventoryNumber: string,
  ) {
    return this.inventoryService.findOneByInventoryNumber(inventoryNumber);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() payload: InsertInventoryPayloadVm,
    @Req() request: any,
  ) {
    return this.inventoryService.create(payload, request.user);
  }

  @Put(':inventoryNumber')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Body() payload: UpdateInventoryPayloadVm,
    @Req() request: any,
    @Param('inventoryNumber') inventoryNumber: string,
  ) {
    return this.inventoryService.update(payload, inventoryNumber, request.user);
  }

  @Delete(':inventoryNumber')
  @HttpCode(HttpStatus.CREATED)
  delete(
    @Req() request: any,
    @Param('inventoryNumber') inventoryNumber: string,
  ) {
    return this.inventoryService.delete(inventoryNumber, request.user);
  }
}
