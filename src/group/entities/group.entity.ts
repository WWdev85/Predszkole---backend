import { Advertisment } from "src/advertisment/entities/advertisment.entity";
import { GroupInterface } from "src/interfaces/group";
import { StaffMember } from "src/staff-member/entities/staff-member.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group  extends BaseEntity implements GroupInterface{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 25,
    })
    name: string;

    @OneToOne(type => StaffMember)
    @JoinColumn()
    teacher: StaffMember;

    @OneToMany(type => Advertisment, entity => entity.group)
    advertisment: Advertisment[];

}
