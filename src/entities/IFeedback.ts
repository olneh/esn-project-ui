import {IBaseEntity} from "./IBaseEntity";
import {IEvent} from "./IEvent";

export interface IFeedback extends IBaseEntity {
    eventId: number;
    comment: string;
    event?: IEvent;
}