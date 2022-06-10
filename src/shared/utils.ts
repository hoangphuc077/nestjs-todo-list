export const toPromise = <T>(data: T): Promise<T> =>{
    return new Promise<T>(resolve => {resolve(data);});
}

export interface JwtPayload {  username: string;}
export interface RegistrationStatus {  
    success: boolean;  
    message: string;
}

export interface LoginStatus {
    error: string;
    message: string;
}