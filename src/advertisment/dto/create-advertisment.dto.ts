
import { IsDate, IsOptional, IsString} from "class-validator";
import { Group } from "src/group/entities/group.entity";


export class CreateAdvertismentDto {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    @IsString()
    @IsOptional()
    group?: Group | null;
}
