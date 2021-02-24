import { Interface } from "readline";

export interface AdressInterface {
    id: string,
    phone: string,
    email: string,
    location: string,
    link: string
    map: string,
    facebook: string,
}

export type GetAdressResponse = AdressInterface;