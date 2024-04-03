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

    async register(data: IEvent): Promise<IEvent | undefined> {
        try {
            const response = await this.axios.post<IEvent>('addEvent', data);
            console.log("data")
            console.log(data)
            if (response.status === 200) {
                return response.data;
            }
            return undefined;

        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

}