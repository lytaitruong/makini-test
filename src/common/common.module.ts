import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { configuration } from './config';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      encoding: 'utf-8',
      envFilePath: ['.env'],
      load: [configuration],
    }),
  ],
  exports: [],
})
export class CommonModule {}
