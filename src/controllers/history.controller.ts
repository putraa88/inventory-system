import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/middlewares/authentication.middleware";
import { HistoryService } from "src/services/history.service";

@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.historyService.findAll();
  }
}