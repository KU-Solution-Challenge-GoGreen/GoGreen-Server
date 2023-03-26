import { PrismaService } from '../common/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VeganTypeRepository {
  constructor(private readonly prisma: PrismaService) {}
}
