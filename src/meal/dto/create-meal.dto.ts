import { IsOptional, IsString } from "class-validator";

export class CreateMealDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    date: string;

    @IsString()
    breakfast: string;

    @IsString()
    firstCourse: string;

    @IsString()
    mainCourse: string;

    @IsString()
    tea: string;
}
