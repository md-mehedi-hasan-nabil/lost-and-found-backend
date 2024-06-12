export interface IAuthUser {
    email: string;
    password: string;
}

export interface IUserRegistration {
    name: string;
    email: string;
    password: string;
    profile: {
        bio: string;
        age: number;
    }
}

export interface IChangePassword {
    new_password: string;
    old_password: string;
}
