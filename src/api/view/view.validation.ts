import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ViewMode } from './view.interface';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class ViewPickModeParamDto {
  @ApiProperty({ enum: ViewMode, required: true })
  @IsDefined()
  @IsEnum(ViewMode)
  mode: ViewMode;
}

export class ViewPickModePaginationDto {
  @ApiProperty({ required: false, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(100)
  @IsInt()
  page?: number;

  @ApiProperty({ required: false, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(100)
  @IsInt()
  size?: number;
}
