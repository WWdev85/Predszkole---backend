

export interface UserInterface{
    id: string,
    name:string,
    surname: string,
    email: string,
    role: string,
    group: string,
}


export type GetUserResponse = UserInterface;

export type GetListOfUsersResponse = UserInterface[];
