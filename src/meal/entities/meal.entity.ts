import { MealInterface } from "src/interfaces/meal";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Meal extends BaseEntity implements MealInterface {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: string;

    @Column()
    breakfast: string;

    @Column()
    firstCourse: string;

    @Column()
    mainCourse: string;

    @Column()
    tea: string;

}
