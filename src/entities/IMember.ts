import {IBaseEntity} from "./IBaseEntity";
import {IMemberEvent} from "./IMemberEvent";

export interface IMember extends IBaseEntity{
    firstName: string,
    lastName: string,

    birthday?: Date;
    phone?: string;
    email?: string;
    points?: number;

    memberEvents: IMemberEvent[];
}
