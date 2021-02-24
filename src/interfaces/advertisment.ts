import { Group } from "src/group/entities/group.entity";

export interface AdvertismentInterface{
    id?: string,
    title:string,
    content: string,
    createdAt: Date,

}


export type GetAdvertismentResponse = AdvertismentInterface;

export type GetListOfAdvertismentResponse = AdvertismentInterface[];