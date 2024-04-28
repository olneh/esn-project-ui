import {IBaseEntity} from "./IBaseEntity";
import {IFeedback} from "./IFeedback";
import {MemberEvent} from "./IMemberEvent";

export interface IEvent extends IBaseEntity {
    eventTitle: string;
    eventDate: Date;
    attendanceType: string;
    comment: string;
    helpersNeeded: number;

    feedbackList: IFeedback[];
    memberEvents: MemberEvent[];
}
