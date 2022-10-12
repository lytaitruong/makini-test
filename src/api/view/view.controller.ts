import { Controller, Get, Param, Query } from '@nestjs/common';
import { ViewService } from './view.service';
import {
  ViewPickModePaginationDto,
  ViewPickModeParamDto,
} from './view.validation';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get(':mode')
  async pickMode(
    @Param() params: ViewPickModeParamDto,
    @Query() query: ViewPickModePaginationDto,
  ) {
    return this.viewService.pickMode(params.mode, query);
  }
}
