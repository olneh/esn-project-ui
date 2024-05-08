import {IFeedback} from "./IFeedback";
import {IMemberEvent} from "./IMemberEvent";

export interface IEvent {
    id?: number;
    eventTitle: string;
    eventDate: Date;
    attendanceType: string;
    comment: string;
    helpersNeeded: number;

    feedbackList: IFeedback[];
    memberEvents: IMemberEvent[];
}
