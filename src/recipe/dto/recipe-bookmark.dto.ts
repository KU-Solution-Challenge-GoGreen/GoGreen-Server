import { ApiProperty } from '@nestjs/swagger';

export class RecipeBookmarkDto {
  @ApiProperty({
    description: '수행 결과',
    type: Boolean,
  })
  isBookmarked!: boolean;

  static of(isBookmarked: boolean): RecipeBookmarkDto {
    return {
      isBookmarked,
    };
  }
}
