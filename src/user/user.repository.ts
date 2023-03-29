import { Injectable } from '@nestjs/common';
import { UserData } from 'src/auth/type/user-data.type';
import { PrismaService } from '../common/services/prisma.service';
import { UserPayload } from './payload/user.payload';
import { MealList } from './type/user-meal.type';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(userId: string, data: UserPayload): Promise<UserData> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        photo: data.photo,
      },
    });

    return {
      id: user.id,
      name: user.name,
      photo: user.photo,
    };
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
          lte: curDate,
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

  async getUserInfo(userId: string): Promise<UserData | null> {
    const userInfo = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, photo: true },
    });
    if (!userInfo) return null;

    return {
      id: userInfo.id,
      name: userInfo.name,
      photo: userInfo.photo,
    };
  }

  async checkDuplicateName(name: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        name: name,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });
    return !!user;
  }
}
