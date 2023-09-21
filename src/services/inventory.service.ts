import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Action } from "src/databases/mongoDB/constants/enum.constant";
import { History } from "src/databases/mongoDB/entities/history.model";
import { Inventory } from "src/databases/mongoDB/entities/inventory.model";
import { BaseResponseVm } from "src/dto/base.dto";
import { InsertInventoryPayloadVm, UpdateInventoryPayloadVm } from "src/dto/inventory.dto";

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryRepository: Model<Inventory>,
    @InjectModel(History.name) private historyRepository: Model<History>,
  ){}

  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find({ isDeleted: false }).catch(e => {
      throw new HttpException(e.meesage, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOneByInventoryNumber(inventoryNumber: string): Promise<Inventory> {
    return await this.inventoryRepository.findOne({ inventoryNumber, isDeleted: false }).catch(e => {
      throw new HttpException(e.meesage, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async create(payload: InsertInventoryPayloadVm, user: any): Promise<BaseResponseVm> {
    const response = new BaseResponseVm()
    
    const newInventory = new Inventory();
    newInventory.inventoryNumber = payload.inventoryNumber;
    newInventory.name = payload.name;
    newInventory.stock = payload.stock;

    const historyLog = new History();
    historyLog.action = Action.ADD;
    historyLog.employeeNumber = user.employeeNumber;
    historyLog.notes = 'INITIAL_ADDITION';

    await Promise.all([
      this.inventoryRepository.create(newInventory),
      this.historyRepository.create(historyLog)
    ]).catch(e => {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    response.status = 'ok';
    response.message = 'new inventory added';
    return response;
  }

  async update(payload: UpdateInventoryPayloadVm, inventoryNumber: string, user: any): Promise<BaseResponseVm> {
    const response = new BaseResponseVm();

    const historyLog = new History();
    historyLog.action = Action.UPD
    historyLog.employeeNumber = user.employeeNumber;
    historyLog.notes = payload.notes

    const inventory = await this.inventoryRepository.findOne({ inventoryNumber, isDeleted: false });
    if (!inventory) throw new HttpException('inventory not found', HttpStatus.NOT_FOUND);
    
    delete payload.notes;

    await Promise.all([
      this.inventoryRepository.updateOne(
        { inventoryNumber }, 
        { 
          ...payload,
          updatedDate: new Date(),
        }
      ),
      this.historyRepository.create(historyLog),
    ]);

    response.status = 'ok';
    response.message = 'inventory updated';
    return response;
  }

  async delete(inventoryNumber: string, user: any): Promise<BaseResponseVm> {
    const response = new BaseResponseVm();
    const exist = await this.inventoryRepository.findOne({ inventoryNumber, isDeleted: false });
    if (!exist) throw new HttpException('inventory not found', HttpStatus.NOT_FOUND);

    await this.inventoryRepository.deleteOne({ inventoryNumber })
    .catch(e => {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    response.status = 'ok';
    response.message = 'inventory deleted';
    return response;
  }
}