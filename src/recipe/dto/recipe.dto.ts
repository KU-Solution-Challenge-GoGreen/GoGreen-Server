import { CreateRecipeDto } from './create-recipe.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeDto extends CreateRecipeDto {
  @ApiProperty({
    type: [String],
    description: '썸네일 사진 List',
  })
  photos!: string[];

  @ApiProperty({
    type: Boolean,
    description: '북마크 여부',
  })
  isBookmarked!: boolean;
}
