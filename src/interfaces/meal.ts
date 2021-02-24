export interface MealInterface {
    id: string,
    date: string,
    breakfast:string,
    firstCourse: string,
    mainCourse:string,
    tea: string,

}

export type GetMealResponse = MealInterface;

export type GetListOfMealResponse = MealInterface[];