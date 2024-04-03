import {BaseService} from "./BaseService";
import {IEvent} from "../entities/IEvent";


export class EventService extends BaseService {
    constructor() {
        super('events/');
    }

    getAllEvents = async (): Promise<IEvent[]> => {
        try {
            const response = await this.axios.get<IEvent[]>('all');

            // if (response.status === 200) {
                return response.data;
            // }
        } catch (e) {
            console.log('error: ', (e as Error).message, e);

            return [];
        }
    }

}