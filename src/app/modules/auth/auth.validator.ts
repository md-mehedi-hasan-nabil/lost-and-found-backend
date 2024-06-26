import { z } from "zod";

export const userLoginValidationSchema = z.object({
    email: z.string({ required_error: "Email is required." }),
    password: z.string({ required_error: "Password is required." })
});

export const userCreateValidationSchema = z.object({
    name: z.string({ required_error: "Name is required." }),
    email: z.string({ required_error: "Email is required." }),
    password: z.string({ required_error: "Password is required." }),
    profile: z.object({
        bio: z.string({ required_error: "User bio is required." }),
        age: z.number({ required_error: "User age is required." }),
    }),
});

export const passwordChangeValidationSchema = z.object({
    old_password: z.string({ required_error: "Old Password is required." }),
    new_password: z.string({ required_error: "New Password is required." })
});