import { AddressType } from "@/generated/prisma/client/enums";
import z from "zod";

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
});

export const updateUserAddressSchema = z.object({
  type: z.enum(Object.values(AddressType)).optional(),
  recipientName: z
    .string()
    .min(2, "Recipient name must be at least 2 characters long")
    .optional(),
  addressLine1: z
    .string()
    .min(2, "Address line 1 must be at least 2 characters long")
    .optional(),
  addressLine2: z
    .string()
    .min(2, "Address line 2 must be at least 2 characters long")
    .optional(),
  city: z.string().min(2, "City must be at least 2 characters long").optional(),
  stateProvince: z
    .string()
    .min(2, "State/Province must be at least 2 characters long")
    .optional(),
  postalCode: z
    .string()
    .min(2, "Postal code must be at least 2 characters long")
    .optional(),
  countryCode: z
    .string()
    .min(2, "Country code must be at least 2 characters long")
    .optional(),
  isDefault: z.boolean().optional(),
});
