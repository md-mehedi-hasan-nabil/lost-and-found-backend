export interface IUserRegistration {
    name: string;
    email: string;
    password: string;
    profile: {
        bio: string;
        age: number;
    }
}