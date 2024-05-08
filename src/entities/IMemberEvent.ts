import {IEvent} from "./IEvent";
import {IMember} from "./IMember";

export interface IMemberEvent{
    id?: number;

    eventId: number;
    memberReceiverId: number;
    memberManagerId?: number;
    task?: string;
    points: number;

    event?: IEvent;
    memberReceiver?: IMember;
    memberManager?: IMember;
}
