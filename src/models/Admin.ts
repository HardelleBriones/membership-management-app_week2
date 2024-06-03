import { z } from "zod";

export const BasicAdminSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "Name must be 2 or more characters long" }),
  full_name: z
    .string()
    .trim()
    .min(2, { message: "Name must be 2 or more characters long" }),
  email: z.string().email().trim().toLowerCase(),
});

export type BasicAdmin = z.infer<typeof BasicAdminSchema>;

const HasIDSchema = z.object({ id: z.number().int().positive() });
const HasPasswordSchema = z
  .string()
  .trim()
  .min(8, { message: "password must be 8 or more characters long" });

export const BasicAdminSginUpSchema = BasicAdminSchema.extend({
  password: HasPasswordSchema,
  confirmPassword: HasPasswordSchema,
});

export const InsertAdminSchema = BasicAdminSchema.extend({
  password: HasPasswordSchema,
});

export type InsertAdmin = z.infer<typeof InsertAdminSchema>;

export const BasicAdminInfoSchema = BasicAdminSchema.merge(HasIDSchema);

export type BasicAdminInfo = z.infer<typeof BasicAdminInfoSchema>;

export type BasicAdminSginUp = z.infer<typeof BasicAdminSginUpSchema>;

export const AdminLogInSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .min(8, { message: "password must be 8 or more characters long" }),
});

export type AdminLogIn = z.infer<typeof AdminLogInSchema>;
