import {IEvent} from "./IEvent";

export interface IFeedback {
    id?: number
    eventId: number;
    comment: string;
    event?: IEvent;
}