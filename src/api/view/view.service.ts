import { BadRequestException, Injectable } from '@nestjs/common';
import { AirtableService } from 'src/third-party/airtable/airtable.service';
import { ViewMode } from './view.interface';
import { ViewPickModePaginationDto } from './view.validation';

@Injectable()
export class ViewService {
  constructor(private readonly airtableService: AirtableService) {}

  async pickMode(mode: ViewMode, query: ViewPickModePaginationDto) {
    switch (mode) {
      case ViewMode.HIERARCHY: {
        const result = await this.airtableService.getHierarchy();

        return result;
      }
      case ViewMode.DRAWINGS: {
        const result = await this.airtableService.getDrawings({
          maxRecords: query.size ?? 100,
          pageSize: query.page ?? 100,
        });
        return result;
      }
      case ViewMode.SERVICE_PLANNER: {
        const result = await this.airtableService.getServicePlan({
          maxRecords: query.size ?? 100,
          pageSize: query.page ?? 100,
        });

        return result;
      }
    }
    throw new BadRequestException('Unsupported this view mode');
  }
}
