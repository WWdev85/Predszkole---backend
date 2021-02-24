import { Group } from "src/group/entities/group.entity";
import { StaffMemberInterface } from "src/interfaces/staffMember";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class StaffMember extends BaseEntity implements StaffMemberInterface {
    

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 25,
    })
    name: string;

    @Column({
        length: 25,
    })
    surname: string;

    @Column({
        length: 10,
    })
    position: string;

    @Column({
        default: null,
        nullable: true,
    })
    photoFn: string | null;

    @OneToOne( type => Group)
    group: Group

    @OneToOne( type => User)
    user: User
}
