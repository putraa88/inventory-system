import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { History } from "src/databases/mongoDB/entities/history.model";

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyRepository: Model<History>,
  ) {}

  async findAll(): Promise<History[]> {
    return this.historyRepository.find({ isDeleted: false }).sort({ createdDate: 1 })
    .catch(e => {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }
}