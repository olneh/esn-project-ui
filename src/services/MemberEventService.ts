import {BaseService} from "./BaseService";

export class MemberEventService extends BaseService {
    constructor() {
        super('memberEvents/');
    }

    async addMemberEventPoints(): Promise<void> {
        const event_id = 1;
        const member_manager_id = 1;
        const member_receiver_id = 2;
        const points = 100;
        const task = "Complete the task";

        const postData = new URLSearchParams();
        postData.append('event_id', event_id.toString());
        postData.append('member_manager_id', member_manager_id.toString());
        postData.append('member_receiver_id', member_receiver_id.toString());
        postData.append('points', points.toString());
        postData.append('task', task);

        try {
            const response = await this.axios.post<void>('addPoints', postData.toString(), {
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // }
            });
            if (response.status === 200) {
                console.log('Member event added successfully.');
            }
        } catch (e) {
            console.error('Error adding member event:', (e as Error).message);
        }
    }

    async registerMemberEvent(eventId: number, memberReceiverId: number): Promise<void> {
        const task = "Complete the task";

        const postData = new URLSearchParams();
        postData.append('event_id', eventId.toString());
        postData.append('member_receiver_id', memberReceiverId.toString());
        postData.append('task', task);

        try {
            const response = await this.axios.post<void>('registerForEvent', postData.toString(), {
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // }
            });
            if (response.status === 200) {
                console.log('Member event added successfully.');
            }
        } catch (e) {
            console.error('Error adding member event:', (e as Error).message);
        }
    }

    async getMemberNamesForEvent(eventId: number): Promise<string[]> {
        try {
            const response = await this.axios.get<string[]>(`${eventId}/eventMemberNames`);
            if (response.status === 200) {
                console.log('Member names fetched successfully.');
                return response.data; // Return the list of member names
            } else {
                console.error('Failed to fetch member names with status:', response.status);
                return []; // Return empty array on non-200 response
            }
        } catch (e) {
            console.error('Error fetching member names:', (e as Error).message);
            return []; // Return empty array on error
        }
    }
}