import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const childSchema = z.object({
  childName: z
    .string()
    .min(2, "Child name must be at least 2 characters")
    .max(100, "Child name must be less than 100 characters"),

  dateOfBirth: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth must be in YYYY-MM-DD format",
    ),

  gender: z
    .string()
    .min(1, "Gender is required"),
});

export const campRegistrationSchema = z
  .object({
    parentGuardianName: z
      .string()
      .min(2, "Parent/Guardian name is required")
      .max(100),

    relationToChild: z
      .string()
      .min(1, "Relation to child is required"),

    email: z
      .string()
      .trim()
      .email("Invalid email address"),

    countryCode: z
      .string()
      .min(1, "Country code is required"),

    contactNumber: z
      .string()
      .min(1, "Contact number is required"),

    secondaryCountryCode: z
      .string()
      .optional()
      .nullable(),

    secondaryContactNumber: z
      .string()
      .optional()
      .nullable(),

    address: z
      .string()
      .optional()
      .nullable(),

    city: z
      .string()
      .optional()
      .nullable(),

    postalCode: z
      .string()
      .optional()
      .nullable(),

    country: z
      .string()
      .optional()
      .nullable(),

    message: z
      .string()
      .max(1000, "Message cannot exceed 1000 characters")
      .optional()
      .nullable(),

    children: z
      .array(childSchema)
      .min(1, "At least one child is required"),
  })
  .superRefine((data, ctx) => {
    // Main phone number
    const phoneNumber = parsePhoneNumberFromString(
      `${data.countryCode}${data.contactNumber}`,
    );

    if (!phoneNumber || !phoneNumber.isValid()) {
      ctx.addIssue({
        code: "custom",
        path: ["contactNumber"],
        message:
          "Invalid phone number for the selected country",
      });
    }

    // Secondary phone number
    if (
      data.secondaryCountryCode &&
      data.secondaryContactNumber
    ) {
      const secondaryPhone =
        parsePhoneNumberFromString(
          `${data.secondaryCountryCode}${data.secondaryContactNumber}`,
        );

      if (
        !secondaryPhone ||
        !secondaryPhone.isValid()
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["secondaryContactNumber"],
          message:
            "Invalid secondary phone number for the selected country",
        });
      }
    }
  });