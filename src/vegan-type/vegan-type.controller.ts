import { Controller, Get } from '@nestjs/common';
import { VeganTypeService } from './vegan-type.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VeganTypeListDto } from './dto/vegan-type-list.dto';
@ApiTags('VeganType API')
@Controller('vegan-type')
export class VeganTypeController {
  constructor(private readonly veganTypeService: VeganTypeService) {}

  @Get()
  @ApiOperation({ summary: '모든 비건 타입 정보 가져오기' })
  @ApiOkResponse({ type: [VeganTypeListDto] })
  async getVeganTypeList(): Promise<VeganTypeListDto> {
    return this.veganTypeService.getVeganTypeList();
  }
}
