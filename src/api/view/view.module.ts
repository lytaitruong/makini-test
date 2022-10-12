import { Module } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import { AirtableModule } from 'src/third-party/airtable/airtable.module';

@Module({
  imports: [AirtableModule],
  controllers: [ViewController],
  providers: [ViewService],
})
export class ViewModule {}
