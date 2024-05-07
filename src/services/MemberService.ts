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
            const response = await this.axios.get<IMember>(`${id}`);
            return response.data;
        } catch (e) {
            console.log('error: ', (e as Error).message, e);
            return null;
        }
    }


    getMembersByIds = async (ids: string[]): Promise<IMember[]> => {
        const promises = ids.map(id => this.getMemberById(id));
        const members = await Promise.all(promises);
        return members.filter(member => member !== null) as IMember[];
    }

    updateMemberById = async (id: string, memberData: IMember): Promise<IMember | null> => {
        try {
            const response = await this.axios.put<IMember>(`${id}`, memberData);
            return response.data;
        } catch (e) {
            console.log('error: ', (e as Error).message, e);
            return null;
        }
    }

}