type Child = {
  childName: string;
  dateOfBirth: string;
  gender: string;
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

export function calculateSummerCampFee(children: Child[]) {
  let subtotal = 0;

  for (const child of children) {
    const age = calculateAge(child.dateOfBirth);

    if (age < 3) {
      throw new Error(
        `${child.childName} must be at least 3 years old`,
      );
    }

    if (age <= 7) {
      subtotal += 360;
    } else {
      subtotal += 560;
    }
  }

  const siblingDiscount = children.length > 1 ? 40 : 0;

  const amountAfterDiscount =
    subtotal - siblingDiscount;

  const processingFee = Number(
    (amountAfterDiscount * 0.03).toFixed(2),
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