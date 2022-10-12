import * as Airtable from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import { AirtableName } from './airtable.interface';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import AirtableError from 'airtable/lib/airtable_error';
import { QueryParams } from 'airtable/lib/query_params';

@Injectable()
export class AirtableUtil {
  private readonly logger = new Logger(AirtableUtil.name);

  private airtable: AirtableBase;

  constructor(private readonly config: ConfigService) {
    const server = new Airtable({
      endpointUrl: 'https://api.airtable.com',
      apiKey: this.config.get<string>('airtable.apiKey'),
      noRetryIfRateLimited: false,
      requestTimeout: 30000,
    });
    this.airtable = server.base(this.config.get<string>('airtable.appKey'));
  }

  async request<T extends Airtable.FieldSet>(model: AirtableName, params?: QueryParams<T>) {
    try {
      const data: Airtable.Records<T>[] = [];
      await this.airtable<T>(model)
        .select(params)
        .eachPage((records, next) => {
          data.push(records);
          next();
        });
      return data;
    } catch (error) {
      this.logger.error(`request airtable all has failed`, error);
      if (error instanceof AirtableError) {
        if (error.statusCode === HttpStatus.TOO_MANY_REQUESTS) {
          await this.delay();
          // Retry handling if have
        }
      }
    }
  }
  async getAll<T extends Airtable.FieldSet>(model: AirtableName, params?: QueryParams<T>) {
    try {
      const response = await this.airtable<T>(model).select(params).all();

      return response;
    } catch (error) {
      this.logger.error(`request airtable all has failed`, error);
      if (error instanceof AirtableError) {
        if (error.statusCode === HttpStatus.TOO_MANY_REQUESTS) {
          await this.delay();
          // Retry handling if have
        }
      }
    }
  }

  async delay(time = 30000) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
