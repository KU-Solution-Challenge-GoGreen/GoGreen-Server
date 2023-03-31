import { Controller, Get, UseGuards } from '@nestjs/common';
import { VeganTypeService } from './vegan-type.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { VeganTypeListDto } from './dto/vegan-type-list.dto';
import { FirebaseAuthGuard } from '../auth/guard/auth.guard';
@ApiTags('VeganType API')
@Controller('vegan-type')
export class VeganTypeController {
  constructor(private readonly veganTypeService: VeganTypeService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 비건 타입 정보 가져오기' })
  @ApiOkResponse({ type: [VeganTypeListDto] })
  async getVeganTypeList(): Promise<VeganTypeListDto> {
    return this.veganTypeService.getVeganTypeList();
  }
}
