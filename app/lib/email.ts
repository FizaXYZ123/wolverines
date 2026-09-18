// Centralized Email Sending & Templates for The Wolverines Field Hockey Club
// Powered by Brevo SMTP API

export interface ContactUsData {
  id: string;
  fullName: string;
  countryCode: string;
  contactNumber: string;
  email: string;
  message: string | null;
}

export interface CampRegistrationData {
  id: string;
  campType: string;
  parentGuardianName: string;
  relationToChild?: string | null;
  email: string;
  countryCode: string;
  contactNumber: string;
  secondaryCountryCode?: string | null;
  secondaryContactNumber?: string | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  children: any;
  subtotal?: any;
  siblingDiscount?: any;
  processingFee?: any;
  totalAmount: any;
  paymentStatus: string;
  registrationId: string;
  message?: string | null;
}

export interface DonationData {
  donorName: string;
  email: string;
  countryCode?: string;
  contactNumber?: string;
  amount: any;
  currency?: string;
  acknowledgement?: string;
}

export interface JoinOurClubData {
  id?: string;
  childName: string;
  dateOfBirth?: string | Date;
  gender?: string;
  parentGuardianName: string;
  relationToChild?: string;
  email: string;
  countryCode: string;
  contactNumber: string;
  secondaryCountryCode?: string | null;
  secondaryContactNumber?: string | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  message?: string;
}

// ----------------------------------------------------------------------
// Base HTML Email Shell (Consistent Brand Styling & High Deliverability)
// ----------------------------------------------------------------------
function getEmailShell({
  title,
  preheader,
  badgeText,
  badgeBg = "#D32F2F",
  contentHtml,
  footerNote,
}: {
  title: string;
  preheader?: string;
  badgeText?: string;
  badgeBg?: string;
  contentHtml: string;
  footerNote?: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  </style>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f3f4f6;">
  ${preheader ? `<div style="display: none; max-height: 0px; overflow: hidden; mso-hide: all; font-size: 1px; line-height: 1px; color: #fff;">${preheader}</div>` : ""}

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
    <!-- Main Card Container -->
    <tr>
      <td style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
        
        <!-- Header Banner -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background: linear-gradient(135deg, #111111 0%, #1f1f1f 50%, #D32F2F 100%); padding: 32px 28px; text-align: center;">
              <!-- Brand Title -->
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #ffffff;">
                THE WOLVERINES
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #f87171;">
                FIELD HOCKEY CLUB • ABBOTSFORD, BC
              </p>

              ${
                badgeText
                  ? `
                <div style="margin-top: 18px;">
                  <span style="display: inline-block; background-color: ${badgeBg}; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 6px 14px; border-radius: 9999px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                    ${badgeText}
                  </span>
                </div>
              `
                  : ""
              }
            </td>
          </tr>
        </table>

        <!-- Body Content -->
        <div style="padding: 32px 28px; color: #1f2937; line-height: 1.6; font-size: 14px;">
          ${contentHtml}
        </div>

        <!-- Footer -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background-color: #0f0f0f; padding: 24px 28px; text-align: center; color: #9ca3af; font-size: 12px; line-height: 1.6; border-top: 1px solid #222222;">
              <p style="margin: 0 0 8px 0; color: #d1d5db; font-weight: 600;">
                The Wolverines Field Hockey Club
              </p>
              <p style="margin: 0 0 12px 0;">
                Abbotsford, British Columbia, Canada<br />
                <a href="mailto:support@thewolverines.ca" style="color: #f87171; text-decoration: none;">support@thewolverines.ca</a> • 
                <a href="tel:+16047101373" style="color: #f87171; text-decoration: none;">+1 (604) 710-1373</a>
              </p>
              ${
                footerNote
                  ? `<p style="margin: 12px 0 0 0; font-size: 11px; color: #6b7280; border-top: 1px solid #1f2937; padding-top: 10px;">${footerNote}</p>`
                  : ""
              }
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// ----------------------------------------------------------------------
// 1. Contact Us & Player Inquiry Notifications
// ----------------------------------------------------------------------

// Sent to Admin
export async function sendContactUsNotification(contact: ContactUsData) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "The Wolverines";
  const notificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!apiKey || !senderEmail || !notificationEmail) {
    throw new Error("Brevo email configuration missing");
  }

  const htmlContent = getEmailShell({
    title: "New Contact Us Message",
    preheader: `New inquiry from ${contact.fullName}`,
    badgeText: "General Inquiry",
    badgeBg: "#D32F2F",
    contentHtml: `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 700; color: #111827;">
          New Message Received
        </h2>
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          A new enquiry has been submitted through the website.
        </p>
      </div>

      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 24px; font-size: 13px;">
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px; font-weight: 600;">Sender Name:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 700;">${contact.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Email Address:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">
            <a href="mailto:${contact.email}" style="color: #D32F2F; text-decoration: none; font-weight: 600;">${contact.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; color: #6b7280; font-weight: 600;">Contact Phone:</td>
          <td style="padding: 12px 16px; color: #111827; font-weight: 600;">
            <a href="tel:${contact.countryCode}${contact.contactNumber}" style="color: #111827; text-decoration: none;">${contact.countryCode} ${contact.contactNumber}</a>
          </td>
        </tr>
      </table>

      <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #374151;">
        Message / Inquiry Content
      </h3>
      <div style="background-color: #fdf2f2; border-left: 4px solid #D32F2F; border-radius: 0 8px 8px 0; padding: 16px; font-size: 14px; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${contact.message || "No specific message provided."}</div>
    `,
    footerNote: `Inquiry Reference ID: ${contact.id}`,
  });

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: notificationEmail }],
      subject: `New Inquiry from ${contact.fullName} - The Wolverines`,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Brevo contact us admin email failed: ${response.status} ${errorData}`);
  }

  return await response.json();
}

// Sent to User (Auto-Reply Confirmation)
export async function sendContactUsUserAcknowledgment(contact: ContactUsData) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "The Wolverines";

  if (!apiKey || !senderEmail) return;

  const htmlContent = getEmailShell({
    title: "Thank You for Contacting The Wolverines",
    preheader: "We have received your enquiry and will be in touch shortly.",
    badgeText: "Inquiry Received",
    badgeBg: "#16a34a",
    contentHtml: `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #111827;">
          Hello ${contact.fullName},
        </h2>
        <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
          Thank you for reaching out to <strong>The Wolverines Field Hockey Club</strong>! We have successfully received your inquiry.
        </p>
      </div>

      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; text-transform: uppercase; color: #111827;">
          What Happens Next?
        </h3>
        <p style="margin: 0 0 10px 0; font-size: 13px; color: #4b5563;">
          Our coaching staff and administration team in Abbotsford review all enquiries promptly. We will contact you at <strong>${contact.email}</strong> or <strong>${contact.countryCode} ${contact.contactNumber}</strong> shortly.
        </p>
        <p style="margin: 0; font-size: 13px; color: #4b5563;">
          If your request is urgent, feel free to give us a direct call at <a href="tel:+16047101373" style="color: #D32F2F; font-weight: 600; text-decoration: none;">+1 (604) 710-1373</a>.
        </p>
      </div>

      <div style="text-align: center; margin-top: 28px;">
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          Warm regards,<br />
          <strong style="color: #111827;">The Wolverines Coaching &amp; Leadership Team</strong>
        </p>
      </div>
    `,
    footerNote: `Inquiry Ref: ${contact.id}`,
  });

  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: contact.email, name: contact.fullName }],
        subject: "We Received Your Message - The Wolverines Field Hockey Club",
        htmlContent,
      }),
    });
  } catch (err) {
    console.error("Failed to send contact us user acknowledgment email:", err);
  }
}

// Backward compatibility alias
export const sendRegistrationNotification = sendContactUsNotification;

// ----------------------------------------------------------------------
// 2. Summer & Winter Camp Registrations (Payment Successful)
// ----------------------------------------------------------------------

// Sent to Admin
export async function sendCampRegistrationNotification(registration: CampRegistrationData) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "The Wolverines";
  const notificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!apiKey || !senderEmail || !notificationEmail) {
    throw new Error("Brevo email configuration is missing");
  }

  const childrenList = Array.isArray(registration.children)
    ? registration.children
    : typeof registration.children === "string"
    ? JSON.parse(registration.children || "[]")
    : [];

  const childrenRows = childrenList
    .map(
      (c: any, index: number) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 10px 12px; font-weight: 600; color: #111827;">${index + 1}. ${c.name || c.childName || "Child"}</td>
        <td style="padding: 10px 12px; color: #4b5563;">${c.age ? `${c.age} yrs` : "N/A"} (${c.gender || "N/A"})</td>
        <td style="padding: 10px 12px; color: #4b5563;">${c.experienceLevel || "N/A"}</td>
        <td style="padding: 10px 12px; color: #16a34a; font-weight: 700; text-align: right;">${c.fee ? `$${c.fee}` : "-"}</td>
      </tr>
    `,
    )
    .join("");

  const formattedTotal = Number(registration.totalAmount || 0).toFixed(2);
  const campName = registration.campType?.toUpperCase() === "WINTER" ? "Winter Camp" : "Summer Camp";

  const htmlContent = getEmailShell({
    title: `New ${campName} Registration`,
    preheader: `New paid registration from ${registration.parentGuardianName} ($${formattedTotal} CAD)`,
    badgeText: `${campName} • Paid`,
    badgeBg: "#16a34a",
    contentHtml: `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #111827;">
          New ${campName} Registration Confirmed
        </h2>
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          Payment of <strong>$${formattedTotal} CAD</strong> has been successfully captured via Stripe.
        </p>
      </div>

      <!-- Parent Info Table -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 24px; font-size: 13px;">
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px; font-weight: 600;">Parent / Guardian:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 700;">${registration.parentGuardianName} ${registration.relationToChild ? `(${registration.relationToChild})` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Email Address:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">
            <a href="mailto:${registration.email}" style="color: #D32F2F; text-decoration: none; font-weight: 600;">${registration.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Primary Phone:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 600;">${registration.countryCode} ${registration.contactNumber}</td>
        </tr>
        ${
          registration.secondaryContactNumber
            ? `
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Secondary Phone:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">${registration.secondaryCountryCode || ""} ${registration.secondaryContactNumber}</td>
        </tr>
        `
            : ""
        }
        <tr>
          <td style="padding: 10px 16px; color: #6b7280; font-weight: 600;">Location:</td>
          <td style="padding: 10px 16px; color: #111827;">
            ${[registration.address, registration.city, registration.postalCode, registration.country].filter(Boolean).join(", ") || "N/A"}
          </td>
        </tr>
      </table>

      <!-- Registered Children Table -->
      <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; text-transform: uppercase; color: #374151;">
        Registered Athletes (${childrenList.length})
      </h3>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 24px; font-size: 13px;">
        <thead>
          <tr style="background-color: #f3f4f6; color: #4b5563; font-size: 11px; text-transform: uppercase;">
            <th style="padding: 8px 12px; text-align: left;">Athlete Name</th>
            <th style="padding: 8px 12px; text-align: left;">Age / Gender</th>
            <th style="padding: 8px 12px; text-align: left;">Experience</th>
            <th style="padding: 8px 12px; text-align: right;">Fee</th>
          </tr>
        </thead>
        <tbody>
          ${childrenRows}
        </tbody>
      </table>

      <!-- Financial Receipt Summary -->
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px;">
          <tr>
            <td style="padding: 4px 0; color: #6b7280;">Subtotal:</td>
            <td style="padding: 4px 0; text-align: right; color: #111827;">$${Number(registration.subtotal || registration.totalAmount).toFixed(2)} CAD</td>
          </tr>
          ${
            parseFloat(registration.siblingDiscount || 0) > 0
              ? `
          <tr>
            <td style="padding: 4px 0; color: #d97706;">Sibling Discount Applied:</td>
            <td style="padding: 4px 0; text-align: right; color: #d97706;">-$${Number(registration.siblingDiscount).toFixed(2)} CAD</td>
          </tr>
          `
              : ""
          }
          ${
            parseFloat(registration.processingFee || 0) > 0
              ? `
          <tr>
            <td style="padding: 4px 0; color: #6b7280;">Processing Fee:</td>
            <td style="padding: 4px 0; text-align: right; color: #111827;">+$${Number(registration.processingFee).toFixed(2)} CAD</td>
          </tr>
          `
              : ""
          }
          <tr style="border-top: 2px solid #e5e7eb;">
            <td style="padding: 10px 0 0 0; font-size: 16px; font-weight: 800; color: #111827;">Total Paid:</td>
            <td style="padding: 10px 0 0 0; font-size: 18px; font-weight: 800; color: #16a34a; text-align: right;">$${formattedTotal} CAD</td>
          </tr>
        </table>
      </div>

      ${
        registration.message
          ? `
        <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 14px; font-size: 13px; color: #92400e; margin-bottom: 20px;">
          <strong>Parent Notes / Medical:</strong> ${registration.message}
        </div>
      `
          : ""
      }
    `,
    footerNote: `Registration ID: ${registration.registrationId}`,
  });

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: notificationEmail }],
      subject: `New ${campName} Registration - ${registration.parentGuardianName} ($${formattedTotal} CAD)`,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Brevo camp admin email failed: ${response.status} ${errorData}`);
  }

  return await response.json();
}

// Sent to Parent (Receipt & Camp Instructions)
export async function sendCampParentConfirmation(registration: CampRegistrationData) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "The Wolverines";

  if (!apiKey || !senderEmail) {
    throw new Error("BREVO_API_KEY / BREVO_SENDER_EMAIL is not configured");
  }

  const childrenList = Array.isArray(registration.children)
    ? registration.children
    : typeof registration.children === "string"
    ? JSON.parse(registration.children || "[]")
    : [];

  const childrenRows = childrenList
    .map(
      (c: any, index: number) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 10px 12px; font-weight: 700; color: #111827;">${index + 1}. ${c.name || c.childName || "Athlete"}</td>
        <td style="padding: 10px 12px; color: #4b5563;">${c.age ? `${c.age} yrs` : "N/A"}</td>
        <td style="padding: 10px 12px; color: #4b5563;">${c.experienceLevel || "All Levels"}</td>
      </tr>
    `,
    )
    .join("");

  const formattedTotal = Number(registration.totalAmount || 0).toFixed(2);
  const campName = registration.campType?.toUpperCase() === "WINTER" ? "Winter Camp" : "Summer Camp";

  const htmlContent = getEmailShell({
    title: `${campName} Registration Confirmed`,
    preheader: `Your ${campName} registration is confirmed! Registration ID: ${registration.registrationId}`,
    badgeText: "Registration Confirmed",
    badgeBg: "#16a34a",
    contentHtml: `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #111827;">
          You're In, ${registration.parentGuardianName}! 🎉
        </h2>
        <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
          Thank you for registering for the <strong>Wolverines ${campName}</strong>. Your payment of <strong>$${formattedTotal} CAD</strong> has been successfully received, and your athlete spot(s) are officially confirmed.
        </p>
      </div>

      <!-- Registration Summary Badge -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fdf2f2; border: 1px solid #fecaca; border-radius: 12px; margin-bottom: 24px; padding: 16px;">
        <tr>
          <td>
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #b91c1c; letter-spacing: 0.5px;">
              Official Registration Reference ID
            </p>
            <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 800; font-family: monospace; color: #111827;">
              ${registration.registrationId}
            </p>
          </td>
          <td style="text-align: right;">
            <span style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px;">
              PAID • $${formattedTotal} CAD
            </span>
          </td>
        </tr>
      </table>

      <!-- Registered Athletes -->
      <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; text-transform: uppercase; color: #111827;">
        Registered Athletes (${childrenList.length})
      </h3>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 24px; font-size: 13px;">
        <thead>
          <tr style="background-color: #f9fafb; color: #6b7280; font-size: 11px; text-transform: uppercase;">
            <th style="padding: 8px 12px; text-align: left;">Athlete Name</th>
            <th style="padding: 8px 12px; text-align: left;">Age</th>
            <th style="padding: 8px 12px; text-align: left;">Program Tier</th>
          </tr>
        </thead>
        <tbody>
          ${childrenRows}
        </tbody>
      </table>

      <!-- What to Bring / Preparation Box -->
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #111827;">
          🎒 What to Bring to Camp:
        </h3>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #4b5563; line-height: 1.6;">
          <li>Mouthguard &amp; Shin Guards (Mandatory for safety)</li>
          <li>Field hockey stick &amp; turf shoes / runners</li>
          <li>Refillable water bottle with athlete name</li>
          <li>Weather-appropriate athletic clothing &amp; sunscreen</li>
        </ul>
      </div>

      <p style="margin: 0 0 16px 0; font-size: 13px; color: #4b5563; line-height: 1.6;">
        Our coaching staff will send detailed schedules, turf location guidelines, and coach introductions one week prior to camp start.
      </p>

      <div style="text-align: center; margin-top: 24px;">
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          See you on the turf!<br />
          <strong style="color: #111827;">The Wolverines Field Hockey Club</strong>
        </p>
      </div>
    `,
    footerNote: `Receipt generated for ${registration.email}`,
  });

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: registration.email, name: registration.parentGuardianName }],
      subject: `${campName} Registration Confirmed - The Wolverines (ID: ${registration.registrationId})`,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Brevo camp parent confirmation email failed: ${response.status} ${errorData}`);
  }

  return await response.json();
}

// ----------------------------------------------------------------------
// 3. Donations (Donor Thank You & Admin Alert)
// ----------------------------------------------------------------------

export async function sendDonationThankYou({
  donorName,
  email,
  amount,
  currency = "CAD",
  acknowledgement = "ACKNOWLEDGE",
}: DonationData) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "The Wolverines";

  if (!apiKey || !senderEmail) {
    throw new Error("Brevo email configuration is missing");
  }

  const formattedAmount = Number(amount || 0).toFixed(2);

  const htmlContent = getEmailShell({
    title: "Thank You for Supporting The Wolverines",
    preheader: `Thank you for your generous gift of ${currency.toUpperCase()} $${formattedAmount}`,
    badgeText: "Official Donation Receipt",
    badgeBg: "#D32F2F",
    contentHtml: `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #111827;">
          Thank You, ${donorName}! ❤️
        </h2>
        <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
          On behalf of the players, coaches, and families of <strong>The Wolverines Field Hockey Club</strong>, we want to express our deepest gratitude for your generous donation.
        </p>
      </div>

      <!-- Receipt Card -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fdf2f2; border: 1px solid #fecaca; border-radius: 12px; margin-bottom: 24px; padding: 20px;">
        <tr>
          <td>
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #b91c1c; letter-spacing: 0.5px;">
              Contribution Amount
            </p>
            <p style="margin: 4px 0 0 0; font-size: 26px; font-weight: 800; color: #111827;">
              ${currency.toUpperCase()} $${formattedAmount}
            </p>
          </td>
          <td style="text-align: right;">
            <span style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 6px;">
              Status: Completed
            </span>
          </td>
        </tr>
      </table>

      <!-- Impact Details -->
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #111827;">
          Your Impact on Our Athletes:
        </h3>
        <p style="margin: 0; font-size: 13px; color: #4b5563; line-height: 1.6;">
          Your contribution directly funds subsidized youth training programs, field equipment, tournament travel assistance, and community clinics in Abbotsford and the Fraser Valley.
        </p>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          With sincere appreciation,<br />
          <strong style="color: #111827;">The Wolverines Field Hockey Club Board of Directors</strong>
        </p>
      </div>
    `,
    footerNote: `Official Receipt for ${email} • ${new Date().toLocaleDateString("en-CA")}`,
  });

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email, name: donorName }],
      subject: `Thank You for Your Donation to The Wolverines (${currency.toUpperCase()} $${formattedAmount})`,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Donation email failed: ${errorText}`);
  }
}

export async function sendDonationAdminNotification({
  donorName,
  email,
  countryCode = "+1",
  contactNumber = "",
  amount,
  currency = "CAD",
  acknowledgement = "ACKNOWLEDGE",
}: DonationData) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "The Wolverines";

  if (!apiKey || !senderEmail || !adminEmail) {
    throw new Error("Brevo email configuration is missing");
  }

  const formattedAmount = Number(amount || 0).toFixed(2);

  const htmlContent = getEmailShell({
    title: "New Donation Received",
    preheader: `New donation of ${currency.toUpperCase()} $${formattedAmount} from ${donorName}`,
    badgeText: "Donation Received",
    badgeBg: "#16a34a",
    contentHtml: `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #111827;">
          New Donation of ${currency.toUpperCase()} $${formattedAmount}
        </h2>
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          A new donation has been received and processed via Stripe.
        </p>
      </div>

      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 24px; font-size: 13px;">
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px; font-weight: 600;">Donor Name:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 700;">${donorName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Email Address:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">
            <a href="mailto:${email}" style="color: #D32F2F; text-decoration: none; font-weight: 600;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Contact Phone:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">${countryCode} ${contactNumber || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Recognition:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 600;">${acknowledgement === "ANONYMOUS" ? "Anonymous Donor" : "Public Acknowledgment"}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; color: #16a34a; font-weight: 800; font-size: 16px;">Total Amount:</td>
          <td style="padding: 12px 16px; color: #16a34a; font-weight: 800; font-size: 18px;">${currency.toUpperCase()} $${formattedAmount}</td>
        </tr>
      </table>
    `,
  });

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: adminEmail }],
      subject: `New Donation Received: $${formattedAmount} CAD - ${donorName}`,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Donation admin email failed: ${errorText}`);
  }
}

// ----------------------------------------------------------------------
// 4. Join Our Club Applications
// ----------------------------------------------------------------------

export async function sendJoinOurClubAdminNotification(joinOurClub: JoinOurClubData) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "The Wolverines";

  if (!apiKey || !senderEmail || !adminEmail) {
    throw new Error("Brevo email configuration is missing");
  }

  const formattedDob = joinOurClub.dateOfBirth
    ? new Date(joinOurClub.dateOfBirth).toLocaleDateString("en-CA")
    : "N/A";

  const htmlContent = getEmailShell({
    title: "New Join Our Club Request",
    preheader: `New player application for ${joinOurClub.childName} (Parent: ${joinOurClub.parentGuardianName})`,
    badgeText: "Club Application",
    badgeBg: "#D32F2F",
    contentHtml: `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #111827;">
          New Player Join Request
        </h2>
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          A new athlete membership application has been submitted.
        </p>
      </div>

      <!-- Athlete Info -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 24px; font-size: 13px;">
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px; font-weight: 600;">Athlete Name:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 700;">${joinOurClub.childName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Date of Birth / Gender:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">${formattedDob} (${joinOurClub.gender || "N/A"})</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Parent / Guardian:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 700;">${joinOurClub.parentGuardianName} ${joinOurClub.relationToChild ? `(${joinOurClub.relationToChild})` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Email Address:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">
            <a href="mailto:${joinOurClub.email}" style="color: #D32F2F; text-decoration: none; font-weight: 600;">${joinOurClub.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Primary Contact:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 600;">${joinOurClub.countryCode} ${joinOurClub.contactNumber}</td>
        </tr>
        ${
          joinOurClub.secondaryContactNumber
            ? `
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Secondary Contact:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">${joinOurClub.secondaryCountryCode || ""} ${joinOurClub.secondaryContactNumber}</td>
        </tr>
        `
            : ""
        }
        <tr>
          <td style="padding: 10px 16px; color: #6b7280; font-weight: 600;">Location:</td>
          <td style="padding: 10px 16px; color: #111827;">
            ${[joinOurClub.address, joinOurClub.city, joinOurClub.postalCode, joinOurClub.country].filter(Boolean).join(", ") || "N/A"}
          </td>
        </tr>
      </table>

      <!-- Message -->
      <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; text-transform: uppercase; color: #374151;">
        Applicant Background &amp; Notes
      </h3>
      <div style="background-color: #fdf2f2; border-left: 4px solid #D32F2F; border-radius: 0 8px 8px 0; padding: 16px; font-size: 14px; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${joinOurClub.message || "No notes provided."}</div>
    `,
    footerNote: joinOurClub.id ? `Applicant ID: ${joinOurClub.id}` : undefined,
  });

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: adminEmail }],
      subject: `New Join Our Club Request: ${joinOurClub.childName} (Parent: ${joinOurClub.parentGuardianName})`,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Join Our Club email failed: ${errorText}`);
  }
}

// ----------------------------------------------------------------------
// 5. Dynamic Marketing & Bulk Broadcast Emails
// ----------------------------------------------------------------------

export async function sendDynamicEmail({
  recipients,
  subject,
  htmlContent,
}: {
  recipients: string[];
  subject: string;
  htmlContent: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "The Wolverines";

  if (!apiKey || !senderEmail) {
    throw new Error("Brevo email configuration is missing");
  }

  let sentCount = 0;
  const failedRecipients: string[] = [];

  // Wrap user custom content inside brand shell if not already full HTML document
  const finalHtml = htmlContent.includes("<!DOCTYPE html")
    ? htmlContent
    : getEmailShell({
        title: subject,
        contentHtml: htmlContent,
      });

  for (const email of recipients) {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email }],
          subject,
          htmlContent: finalHtml,
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error(`Failed to send email to ${email}:`, responseText);
        failedRecipients.push(email);
        continue;
      }

      sentCount++;
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
      failedRecipients.push(email);
    }
  }

  return {
    sentCount,
    failedRecipients,
  };
}
