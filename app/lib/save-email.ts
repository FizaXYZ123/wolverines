import { prisma } from "@/app/lib/prisma";

export async function saveEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return null;
  }

  const existingEmail = await prisma.emailContact.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingEmail) {
    return existingEmail;
  }

  return prisma.emailContact.create({
    data: {
      email: normalizedEmail,
    },
  });
}