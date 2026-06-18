import { isValidFileType } from "@/utils/helpers";
import z from "zod";
import { AddressType } from "@/generated/prisma/client/enums";

export const addUserAddressSchema = z.object({
  type: z.enum(Object.values(AddressType)),
  recipientName: z
    .string()
    .min(2, "Recipient name must be at least 2 characters long"),
  addressLine1: z
    .string()
    .min(2, "Address line 1 must be at least 2 characters long"),
  addressLine2: z
    .string()
    .min(2, "Address line 2 must be at least 2 characters long")
    .optional(),
  city: z.string().min(2, "City must be at least 2 characters long"),
  stateProvince: z
    .string()
    .min(2, "State/Province must be at least 2 characters long"),
  postalCode: z
    .string()
    .min(2, "Postal code must be at least 2 characters long"),
  countryCode: z
    .string()
    .min(2, "Country code must be at least 2 characters long")
    .optional(),
  avatar: z
    .any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine((file) => isValidFileType(file?.name), "Not a valid image.")
    .optional(),
});

export const updateUserProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits long")
    .optional(),
  avatar: z
    .any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine((file) => isValidFileType(file?.name), "Not a valid image.")
    .optional(),
});
