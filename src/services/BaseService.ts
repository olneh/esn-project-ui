import Axios, { AxiosInstance } from 'axios';

export abstract class BaseService {
    private static hostBaseURL = "https://localhost:8443/esn/api/";

    protected axios: AxiosInstance;

    protected constructor(baseUrl: string) {

        this.axios = Axios.create(
            {
                baseURL: BaseService.hostBaseURL + baseUrl,
                headers: {
                    common: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        )

        this.axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
        })
    }


}