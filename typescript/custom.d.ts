declare namespace Express {
    export interface Request {
        user: {
            id: string;
            deviceId: string;
            role: string;
        };
        getLocalLanguage: (key: string) => string;
        files: any;
        file: any;
    }
    export interface Response {
        cache: any;
    }
}
