import { IRegisterData } from "../entities/registration/IRegisterData";
import { ILoginData } from "../entities/registration/ILoginData";
import { BaseService } from "./BaseService";
import {Axios} from "axios";
import {IJWTResponse} from "../entities/registration/IJWTResponse";


export class IdentityService extends BaseService {
    constructor() {
        super('account/');
    }

    async register(data: IRegisterData): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>('register', data);

            console.log('register response', response);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async login(data: ILoginData): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>('login', data);

            console.log('login response', response);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async logout(data: IJWTResponse): Promise<true | undefined> {
        console.log(data);

        try {
            const response = await this.axios.post(
                'logout',
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + data.jwt
                    }
                }
            );

            console.log('logout response', response);
            if (response.status === 200) {
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async refreshToken(data: IJWTResponse): Promise<IJWTResponse | undefined> {
        console.log(data);

        try {
            const response = await this.axios.post<IJWTResponse>(
                'refreshtoken',
                data
            );

            console.log('refresh token response', response);
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