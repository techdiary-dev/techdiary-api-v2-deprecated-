export declare class CreateAdminInput {
    name: string;
    username: string;
    email: string;
    password: string;
}
declare const UpdateAdminInput_base: import("@nestjs/common").Type<Partial<CreateAdminInput>>;
export declare class UpdateAdminInput extends UpdateAdminInput_base {
}
export {};
