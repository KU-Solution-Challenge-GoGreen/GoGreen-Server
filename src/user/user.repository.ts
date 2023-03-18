import { Injectable } from '@nestjs/common';
import { UserData } from 'src/auth/type/user-data.type';
import { PrismaService } from '../common/services/prisma.service';
import { UserPayload } from './payload/user.payload';
import { MealList } from './type/user-meal.type';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(
    userId: string,
    data: UserPayload,
  ): Promise<UserData | null> {
    const userValid = await this.prisma.meal.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    if (!userValid) return null;

    const nameValid = await this.prisma.user.findFirst({
      where: {
        name: data.name,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });
    if (nameValid) return null;

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        photo: data.photo,
      },
    });

    const resData: UserData = {
      id: user.id,
      name: user.name,
      photo: user.photo,
    };
    return resData;
  }

  async getMealListByUserId(userId: string): Promise<MealList | null> {
    const curDate = new Date();
    const startDate = new Date();
    startDate.setMonth(curDate.getMonth() - 6);
    const userInfo = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, photo: true, createdAt: true },
    });
    if (!userInfo) return null;

    const rawMealList = await this.prisma.meal.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lt: curDate,
        },
      },
      select: {
        date: true,
        Recipe: {
          select: {
            carbonFootprint: true,
          },
        },
      },
    });

    const mealList = rawMealList.map((data) => {
      return { footprint: data.Recipe.carbonFootprint, date: data.date };
    });

    return {
      id: userInfo.id,
      createdAt: userInfo.createdAt,
      name: userInfo.name,
      photo: userInfo.photo,
      mealList: mealList,
    };
  }
}
