import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserInfoDto } from './dto/userInfo.dto';
import { UserPayload } from './payload/user.payload';
import { UserMealCount } from './type/user-meal-count-record.type';
import { MealList } from './type/user-meal.type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser(userId: string, payload: UserPayload) {
    const user = await this.userRepository.updateUser(userId, payload);
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }
    return UserDto.of(user);
  }

  async getUserInfo(userId: string): Promise<UserInfoDto> {
    const meals: MealList | null =
      await this.userRepository.getMealListByUserId(userId);
    if (!meals) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const mealCountsByDate: UserMealCount[] = [];
    const dateToCountMap = new Map<string, number>();
    const dateToSumMap = new Map<string, number>();
    const totalMealCount = meals.mealList.length;
    let totalMealFootprint = 0;

    for (const meal of meals.mealList) {
      const dateStr = meal.date.toDateString();

      // 날짜별 횟수를 구합니다.
      const count = dateToCountMap.get(dateStr) ?? 0;
      dateToCountMap.set(dateStr, count + 1);

      // 날짜별 합을 구합니다.
      const sum = dateToSumMap.get(dateStr) ?? 0;
      dateToSumMap.set(dateStr, sum + meal.footprint);
    }

    // 날짜별 횟수를 포맷팅합니다.
    for (const [dateStr, count] of dateToCountMap.entries()) {
      const date = new Date(dateStr);
      mealCountsByDate.push({ date, count });
    }

    // 날짜별 발자국을 합산하여 평균을 구합니다.
    for (const [dateStr, sum] of dateToSumMap.entries()) {
      totalMealFootprint += sum;
    }
    const avgFootprint = totalMealFootprint / totalMealCount;

    // 가입 경과 날짜를 구합니다.
    const today = new Date();
    const diffTime = today.getTime() - meals.createdAt.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      id: userId,
      name: meals.name,
      photo: meals.photo,
      mealCount: mealCountsByDate,
      avgFootprint,
      sinceSignUp: diffDays,
    };
  }
}
