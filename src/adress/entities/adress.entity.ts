import { AdressInterface } from "src/interfaces/adress";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Adress extends BaseEntity implements AdressInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    location: string;
    
    @Column()
    link: string;

    @Column()
    map: string;

    @Column()
    facebook: string;
}
