import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { airtableConfig } from './airtable.config';
import { AirtableService } from './airtable.service';
import { AirtableUtil } from './airtable.util';

@Module({
  imports: [ConfigModule.forFeature(airtableConfig)],
  exports: [AirtableService, AirtableUtil],
  providers: [AirtableService, AirtableUtil],
})
export class AirtableModule {}
