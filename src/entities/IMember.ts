import {IBaseEntity} from "./IBaseEntity";

export interface IMember extends IBaseEntity{
    name: string;
    birthday?: Date;
    phone?: string;
    email?: string;
    points?: number;
}
