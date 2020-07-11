export declare class Admin {
    name: string;
    username: string;
    email: string;
    password: string;
    comparePassword(passwordText: string): Promise<boolean>;
}
