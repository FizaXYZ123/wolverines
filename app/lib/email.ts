export async function sendRegistrationNotification(registration: {
  id: string;
  fullName: string;
  countryCode: string;
  contactNumber: string;
  email: string;
  message: string | null;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;
  const notificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured");
  }

  if (!senderEmail) {
    throw new Error("BREVO_SENDER_EMAIL is not configured");
  }

  if (!notificationEmail) {
    throw new Error("ADMIN_NOTIFICATION_EMAIL is not configured");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: senderName || "The Wolverines",
        email: senderEmail,
      },
      to: [
        {
          email: notificationEmail,
        },
      ],
      subject: "New Registration Received - The Wolverines",
      textContent: `
A new registration has been submitted.

Name: ${registration.fullName}
Contact Number: ${registration.contactNumber}
Email: ${registration.email}
Message: ${registration.message || "No message"}
Registration ID: ${registration.id}
        `,
      htmlContent: `
          <h2>New Registration Received</h2>

          <p>
            <strong>Name:</strong> ${registration.fullName}
          </p>

          <p>
  <strong>Contact Number:</strong> ${registration.countryCode} ${registration.contactNumber}
</p>

          <p>
            <strong>Email:</strong> ${registration.email}
          </p>

          <p>
            <strong>Message:</strong>
            ${registration.message || "No message"}
          </p>
        `,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();

    throw new Error(`Brevo email failed: ${response.status} ${errorData}`);
  }

  return await response.json();
}

export async function sendCampRegistrationNotification(registration: {
  id: string;
  campType: string;
  parentGuardianName: string;
  email: string;
  countryCode: string;
  contactNumber: string;
  children: any;
  totalAmount: any;
  paymentStatus: string;
  registrationId: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;
  const notificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured");
  }

  if (!senderEmail) {
    throw new Error("BREVO_SENDER_EMAIL is not configured");
  }

  if (!notificationEmail) {
    throw new Error("ADMIN_NOTIFICATION_EMAIL is not configured");
  }

  const numberOfChildren = Array.isArray(registration.children)
    ? registration.children.length
    : 0;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: senderName || "The Wolverines",
        email: senderEmail,
      },

      to: [
        {
          email: notificationEmail,
        },
      ],

      subject: `New ${registration.campType} Camp Registration - Payment Successful`,

      textContent: `
A new ${registration.campType} Camp registration has been completed.

Parent/Guardian: ${registration.parentGuardianName}
Email: ${registration.email}
Contact: ${registration.countryCode} ${registration.contactNumber}

Number of Children: ${numberOfChildren}

Total Amount: $${registration.totalAmount}
Payment Status: ${registration.paymentStatus}

Registration ID: ${registration.registrationId}
        `,

      htmlContent: `
          <h2>New ${registration.campType} Camp Registration</h2>

          <p>
            <strong>Parent/Guardian:</strong>
            ${registration.parentGuardianName}
          </p>

          <p>
            <strong>Email:</strong>
            ${registration.email}
          </p>

          <p>
            <strong>Contact:</strong>
            ${registration.countryCode}
            ${registration.contactNumber}
          </p>

          <p>
            <strong>Number of Children:</strong>
            ${numberOfChildren}
          </p>

          <p>
            <strong>Total Amount:</strong>
            $${registration.totalAmount}
          </p>

          <p>
            <strong>Payment Status:</strong>
            ${registration.paymentStatus}
          </p>

          <p>
            <strong>Registration ID:</strong>
            ${registration.registrationId}
          </p>
        `,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();

    throw new Error(
      `Brevo camp admin email failed: ${response.status} ${errorData}`,
    );
  }

  return await response.json();
}

export async function sendCampParentConfirmation(registration: {
  id: string;
  campType: string;
  parentGuardianName: string;
  email: string;
  children: any;
  totalAmount: any;
  registrationId: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured");
  }

  if (!senderEmail) {
    throw new Error("BREVO_SENDER_EMAIL is not configured");
  }

  const numberOfChildren = Array.isArray(registration.children)
    ? registration.children.length
    : 0;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: senderName || "The Wolverines",
        email: senderEmail,
      },

      to: [
        {
          email: registration.email,
          name: registration.parentGuardianName,
        },
      ],

      subject: `${registration.campType} Camp Registration Confirmed - The Wolverines`,

      textContent: `
Hello ${registration.parentGuardianName},

Thank you for registering for the Wolverines ${registration.campType} Camp.

Your payment has been successfully received and your registration is confirmed.

Registration ID: ${registration.registrationId}

Number of Children: ${numberOfChildren}

Total Paid: $${registration.totalAmount}

Thank you,
The Wolverines
        `,

      htmlContent: `
          <h2>${registration.campType} Camp Registration Confirmed</h2>

          <p>
            Hello ${registration.parentGuardianName},
          </p>

          <p>
            Thank you for registering for the
            <strong>Wolverines ${registration.campType} Camp</strong>.
          </p>

          <p>
            Your payment has been successfully received and
            your registration is confirmed.
          </p>

          <p>
            <strong>Registration ID:</strong>
            ${registration.registrationId}
          </p>

          <p>
            <strong>Number of Children:</strong>
            ${numberOfChildren}
          </p>

          <p>
            <strong>Total Paid:</strong>
            $${registration.totalAmount}
          </p>

          <p>
            Thank you,<br />
            <strong>The Wolverines</strong>
          </p>
        `,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();

    throw new Error(
      `Brevo camp parent confirmation email failed: ${response.status} ${errorData}`,
    );
  }

  return await response.json();
}
