import {IBaseEntity} from "./IBaseEntity";
import {IEvent} from "./IEvent";
import {IMember} from "./IMember";

export interface MemberEvent extends IBaseEntity{
    eventId: number;
    memberReceiverId: number;
    memberManagerId: number;
    task: string;
    points: number;

    event?: IEvent;
    memberReceiver?: IMember;
    memberManager?: IMember;
}
