export interface IRegisterData {
    firstName: string,
    lastName: string,

    birthday?: Date;
    phone: string,
    email: string,

    points?: number,

    password: string,
    confirmPassword: string,
}