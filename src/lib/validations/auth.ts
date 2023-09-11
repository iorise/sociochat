import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be less than 50 characters"),
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z
  .object({
    email: z.string().min(1, "Email is required").email({
      message: "Invalid email",
    }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
