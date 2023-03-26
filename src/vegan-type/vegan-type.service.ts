import { Injectable } from '@nestjs/common';
import { VeganTypeRepository } from './vegan-type.repository';

@Injectable()
export class VeganTypeService {
  constructor(private readonly veganTypeRepository: VeganTypeRepository) {}
}
