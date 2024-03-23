import {IBaseEntity} from "./IBaseEntity";

export interface IEvent extends IBaseEntity {
    eventTitle: string;
    date: Date;
    attendanceType: string;
    comment: string;
    helpersNeeded: number;
}
