type Child = {
  childName: string;
  dateOfBirth: string;
  gender: string;
};

type CampPricing = {
  minAge: number;
  maxAge: number;
  youngerAgePrice: any;
  olderAgePrice: any;
  siblingDiscount: any;
  processingFeePercent: any;
};

function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(`${dateOfBirth}T00:00:00`);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference =
    today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function calculateCampFee(
  children: Child[],
  pricing: CampPricing,
) {
  let subtotal = 0;

  for (const child of children) {
    const age = calculateAge(child.dateOfBirth);

    if (age < pricing.minAge) {
      throw new Error(
        `${child.childName} must be at least ${pricing.minAge} years old`,
      );
    }

    if (age <= pricing.maxAge) {
      subtotal += Number(pricing.youngerAgePrice);
    } else {
      subtotal += Number(pricing.olderAgePrice);
    }
  }

  const siblingDiscount =
    children.length > 1
      ? Number(pricing.siblingDiscount)
      : 0;

  const amountAfterDiscount =
    subtotal - siblingDiscount;

  const processingFee = Number(
    (
      amountAfterDiscount *
      (Number(pricing.processingFeePercent) / 100)
    ).toFixed(2),
  );

  const totalAmount = Number(
    (amountAfterDiscount + processingFee).toFixed(2),
  );

  return {
    subtotal,
    siblingDiscount,
    processingFee,
    totalAmount,
  };
}