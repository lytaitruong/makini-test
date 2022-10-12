import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewModule } from './api/view/view.module';
import { AirtableModule } from './third-party/airtable/airtable.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    //LIBRARY
    CommonModule,
    //THIRD_PARTY
    AirtableModule,
    //API
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
