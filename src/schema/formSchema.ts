import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    address: z.string().min(1, "Address is required"),
    age: z.number().min(18, "Age must be 18+"),
    gender: z.string().min(1, "Gender is required"),
    contactNumber: z.string().regex(/^[0-9]{10}$/, "Must be 10 digits"),
    birthDate: z.string().min(1, "Birth date required"),
    profileImage: z.instanceof(FileList).optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agreed: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type FormValues = Partial<SignupFormValues> & LoginFormValues;
