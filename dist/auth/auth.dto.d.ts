export declare class AdminRegisterDTO {
    name: string;
    username: string;
    email: string;
    password: string;
}
export declare class LoginDTO {
    identifier: string;
    password: string;
}
export declare class UserLoginDTO extends LoginDTO {
}
export declare class AuthPayload {
    token: string;
}
