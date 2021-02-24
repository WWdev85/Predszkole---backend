import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { GetListOfMealResponse, GetMealResponse } from 'src/interfaces/meal';


@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post('/')
  create(@Body() meal: CreateMealDto) : Promise<GetMealResponse> {
    return this.mealService.createMeal(meal);
  }

  @Get('/')
  getAllMeals() : Promise<GetListOfMealResponse>{
    return this.mealService.getAllMeals();
  }

  @Delete('/:id')
  removeMeal(
    @Param('id') id: string
  ): void {
    this.mealService.removeMeal(id);
  }
}
