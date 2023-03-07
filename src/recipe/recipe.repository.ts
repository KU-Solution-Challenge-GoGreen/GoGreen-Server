import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}
}
