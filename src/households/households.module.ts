import { Module } from '@nestjs/common';
import { HouseholdsService } from './households.service';

@Module({
  providers: [HouseholdsService]
})
export class HouseholdsModule {}
