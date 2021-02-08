import { Group } from "src/group/entities/group.entity";
import { AdvertismentInterface } from "src/interfaces/advertisment";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Advertisment extends BaseEntity implements AdvertismentInterface {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
    })
    content: string;

    @Column({
        default: null,
        nullable: true,
    })
    photoFn: string | null;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @ManyToOne( type => Group, entity => entity.advertisment , {nullable: true})
    group?: Group | null;

}
