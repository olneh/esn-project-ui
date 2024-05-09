import {BaseService} from "./BaseService";
import {MemberEventDTO} from "../entities/MemberEventDto";

export class MemberEventService extends BaseService {
    constructor() {
        super('memberEvents/');
    }

    async addMemberEventPoints(data: MemberEventDTO): Promise<void> {
        try {
            const response = await this.axios.post<void>('addPoints', data);
            if (response.status === 200) {
                console.log('Member event points added successfully.');
            }
        } catch (e) {
            console.error('Error registering member event:', (e as Error).message);
        }
    }

    async registerMemberEvent(data: MemberEventDTO): Promise<void> {
        try {
            const response = await this.axios.post<void>('registerForEvent', data);
            if (response.status === 200) {
                console.log('Member event registered successfully.');
            }
        } catch (e) {
            console.error('Error registering member event:', (e as Error).message);
        }
    }

    async getMemberIdsForEvent(eventId: number): Promise<string[]> {
        try {
            const response = await this.axios.get<string[]>(`${eventId}/eventMemberIds`);
            if (response.status === 200) {
                console.log('Member names fetched successfully.');
                return response.data;
            } else {
                console.error('Failed to fetch member names with status:', response.status);
                return [];
            }
        } catch (e) {
            console.error('Error fetching member names:', (e as Error).message);
            return [];
        }
    }
}