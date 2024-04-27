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

    async updateEvent(eventId: number, data: IEvent): Promise<IEvent | undefined> {
        try {
            const response = await this.axios.put<IEvent>(`updateEvent/${eventId.toString()}`, data);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error:', (e as Error).message);
            return undefined;
        }
    }

    async deleteEvent(eventId: number): Promise<boolean> {
        try {
            const response = await this.axios.delete<boolean>(`deleteEvent/${eventId.toString()}`);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (e) {
            console.log('error:', (e as Error).message);
            return false;
        }
    }
}