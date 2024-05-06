import { BaseService } from "./BaseService";
import { IEvent } from "../entities/IEvent";


export class EventService extends BaseService {
    constructor() {
        super('events/');
    }

    async getAllEvents(): Promise<IEvent[]> {
        try {
            const response = await this.axios.get<IEvent[]>('all');
            if (response.status === 200) {
                return response.data;
            } else {
                console.log('Non-200 status:', response.status);
                return [];
            }
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
            } else {
                console.log('Failed to register event:', response.status);
                return undefined;
            }
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async updateEvent(eventId: number, data: IEvent): Promise<IEvent | undefined> {
        try {
            const response = await this.axios.put<IEvent>(`updateEvent/${eventId}`, data);
            if (response.status === 200) {
                return response.data;
            } else {
                console.log('Failed to update event:', response.status);
                return undefined;
            }
        } catch (e) {
            console.log('error:', (e as Error).message);
            return undefined;
        }
    }

    async deleteEvent(eventId: number): Promise<boolean> {
        try {
            const response = await this.axios.delete<boolean>(`deleteEvent/${eventId}`);
            if (response.status === 200) {
                return true;
            } else {
                console.log('Failed to delete event:', response.status);
                return false;
            }
        } catch (e) {
            console.log('error:', (e as Error).message);
            return false;
        }
    }
}