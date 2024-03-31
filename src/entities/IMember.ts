import {IBaseEntity} from "./IBaseEntity";

export interface IMember extends IBaseEntity{
    firstName: string,
    lastName: string,

    birthday?: Date;
    phone?: string;
    email?: string;
    points?: number;
}
