import { Injectable } from '@nestjs/common';
import { VeganTypeRepository } from './vegan-type.repository';
import { VeganTypeListDto } from './dto/vegan-type-list.dto';

@Injectable()
export class VeganTypeService {
  constructor(private readonly veganTypeRepository: VeganTypeRepository) {}

  async getVeganTypeList(): Promise<VeganTypeListDto> {
    const categoryList = await this.veganTypeRepository.getCategoryList();
    const veganTypeList = await this.veganTypeRepository.getVeganTypeList();
    return VeganTypeListDto.of(veganTypeList, categoryList);
  }
}
