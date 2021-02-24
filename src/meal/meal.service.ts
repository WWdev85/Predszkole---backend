import { Injectable } from '@nestjs/common';
import { GetListOfMealResponse, GetMealResponse } from 'src/interfaces/meal';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meal } from './entities/meal.entity';


@Injectable()
export class MealService {

async createMeal({
  id,
  date,
  breakfast,
  firstCourse,
  mainCourse,
  tea
}: CreateMealDto ) : Promise<GetMealResponse>{

  const newMeal = new Meal();

  if(id){
    newMeal.id = id;
  }

  newMeal.date = date;
  newMeal.breakfast = breakfast;
  newMeal.firstCourse =firstCourse;
  newMeal.mainCourse = mainCourse;
  newMeal.tea = tea;

  await Meal.save(newMeal);

  return newMeal;
}

async getAllMeals() :Promise<GetListOfMealResponse>{
  return Meal.find();
}

async removeMeal( id : string) : Promise<void>{
  await Meal.delete(id);
}

}
