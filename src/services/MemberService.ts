import {BaseService} from "./BaseService";
import {IMember} from "../entities/IMember";


export class MemberService extends BaseService {
    constructor() {
        super('members/');
    }

    getAllMembers = async (): Promise<IMember[]> => {
        try {
            const response = await this.axios.get<IMember[]>('all');
            return response.data;
        } catch (e) {
            console.log('error: ', (e as Error).message, e);

            return [];
        }
    }

    getMemberById = async (id: string): Promise<IMember | null> => {
        try {
            const response = await this.axios.get<IMember>(`member/${id}`);
            return response.data;
        } catch (e) {
            console.log('error: ', (e as Error).message, e);
            return null;
        }
    }

    updateMemberById = async (id: string, memberData: Partial<IMember>): Promise<IMember | null> => {
        try {
            const response = await this.axios.put<IMember>(`member/${id}`, memberData);
            return response.data;
        } catch (e) {
            console.log('error: ', (e as Error).message, e);
            return null;
        }
    }

}