import { MinLength, IsOptional } from 'class-validator';

export class SearchParams {
  @IsOptional()
  @MinLength(3)
  search?: string;
}
