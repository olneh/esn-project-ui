import {IFeedback} from "../entities/IFeedback";
import {BaseService} from "./BaseService";

export class FeedbackService extends BaseService{
    constructor() {
        super('feedback/');
    }

    async createFeedback(feedback: IFeedback, eventId: number): Promise<IFeedback> {
        const url = `?eventId=${eventId}`;
        const response = await this.axios.post<IFeedback>(url, feedback);
        return response.data;
    }
}
