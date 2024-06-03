import { z } from "zod";
import dayjs from "dayjs";

export const BasicMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be 2 or more characters long" }),
  email: z.string().email().trim().toLowerCase(),
  phone: z
    .string()
    .min(11, { message: "Phone numbers are a minimum of 10 digits" }),
  status: z.enum(["Active", "Pending", "Inactive", "Suspended"], {
    errorMap: () => ({
      message:
        "Status must be one of following: Active, Pending, Inactive, Suspended",
    }),
  }),
  membership_expiration: z
    .string()
    .transform((val) => dayjs(val).toDate())
    .refine((val) => dayjs(val).isAfter(dayjs(), "day"), {
      message: "Membership expiration date must be in the future",
    }),
});

const HasAddressSchema = z
  .string()
  .trim()
  .min(5, { message: "Name must be 5 or more characters long" });

const HasDateAddedSchema = z
  .string()
  .refine((val) => dayjs(val, "YYYY-MM-DD", true).isValid(), {
    message: "Invalid date format",
  })
  .transform((val) => dayjs(val).toDate());

const HasIDSchema = z.object({ id: z.number().int().positive() });

export const CardDisplayMemberSchemaWithId =
  BasicMemberSchema.merge(HasIDSchema);

export const MemberFormSchemaWithAddress = BasicMemberSchema.extend({
  address: HasAddressSchema,
});

export const MemberDisplaySchema = BasicMemberSchema.extend({
  address: HasAddressSchema,
  date_added: HasDateAddedSchema,
}).merge(HasIDSchema);

export type CardDisplayMemberWithId = z.infer<
  typeof CardDisplayMemberSchemaWithId
>;

export type MemberFormWithAddress = z.infer<typeof MemberFormSchemaWithAddress>;

export type MemberDisplay = z.infer<typeof MemberDisplaySchema>;

export const DisplayMemberEdit = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be 2 or more characters long" }),
  email: z.string().email().trim().toLowerCase(),
  phone: z
    .string()
    .min(11, { message: "Phone numbers are a minimum of 10 digits" }),
  status: z.enum(["Active", "Pending", "Inactive", "Suspended"], {
    errorMap: () => ({
      message:
        "Status must be one of following: Active, Pending, Inactive, Suspended",
    }),
  }),
});

export const DisplayMemberEditWithAddress = DisplayMemberEdit.extend({
  address: HasAddressSchema,
});

export type DisplayMemberEditWithAddressType = z.infer<
  typeof DisplayMemberEditWithAddress
>;
