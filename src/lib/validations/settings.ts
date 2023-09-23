import * as z from "zod";

export const settingsSchema = z.object({
  image: z.string().url(),
  name: z
    .string({
      required_error: "Please type your name.",
    })
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    }).optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
});
