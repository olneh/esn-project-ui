import {IBaseEntity} from "./IBaseEntity";

export interface IEvent extends IBaseEntity {
    eventTitle: string;
    eventDate: Date;
    attendanceType: string;
    comment: string;
    helpersNeeded: number;
}
