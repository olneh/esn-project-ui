import {IRegisterData} from "../entities/registration/IRegisterData";
import {ILoginData} from "../entities/registration/ILoginData";
import {BaseService} from "./BaseService";
import {Axios, AxiosError} from "axios";
import {IJWTResponse} from "../entities/registration/IJWTResponse";
import {IMember} from "../entities/IMember";


export class MemberService extends BaseService {
    constructor() {
        super('account/');
    }

    getAllMembers = async (): Promise<IMember[]> => {
        try {
            const response = await this.axios.get<IMember[]>('allMembers');

            // if (response.status === 200) {
                return response.data;
            // }
        } catch (e) {
            console.log('error: ', (e as Error).message, e);

            return [];
        }
    }

}