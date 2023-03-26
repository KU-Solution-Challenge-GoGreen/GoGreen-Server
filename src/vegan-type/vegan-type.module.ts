import { Module } from '@nestjs/common';
import { VeganTypeService } from './vegan-type.service';
import { VeganTypeController } from './vegan-type.controller';
import { VeganTypeRepository } from './vegan-type.repository';

@Module({
  providers: [VeganTypeService],
  controllers: [VeganTypeController, VeganTypeRepository],
})
export class VeganTypeModule {}
