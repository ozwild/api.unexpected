import { IsInt, Min, Max } from 'class-validator';

export class PageParams {
  @IsInt()
  @Min(0)
  page: number = 0;

  @IsInt()
  @Min(1)
  @Max(250)
  size: number = 10;
}
