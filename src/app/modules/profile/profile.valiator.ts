import { z } from "zod";

export const updateProfileValidationSchema = z.object({
    bio: z.string({ invalid_type_error: "Bio is string." }),
    age: z.number({ invalid_type_error: "Age is number." }),
});
