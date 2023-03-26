import { Controller } from '@nestjs/common';
import { VeganTypeService } from './vegan-type.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('VeganType API')
@Controller('vegan-type')
export class VeganTypeController {
  constructor(private readonly veganTypeService: VeganTypeService) {}
}
