import { IsUUID } from 'class-validator';

export class OneEntityParams {
  @IsUUID()
  id: string;
}
