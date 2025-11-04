/**
 * Email Templates for Keep Hearing Initiative
 *
 * Professional, responsive HTML email templates with nonprofit branding
 */

const brandColors = {
  primary: "#1E3A5F", // Keep Hearing blue
  secondary: "#4A90E2",
  accent: "#F39C12",
  text: "#333333",
  textLight: "#666666",
  background: "#F8F9FA",
  white: "#FFFFFF",
};

/**
 * Base email wrapper with consistent styling
 */
function emailWrapper(content: string, preheader?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Keep Hearing Initiative</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${brandColors.background};">
  ${preheader ? `
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ${preheader}
  </div>
  <div style="display: none; max-height: 0px; overflow: hidden;">
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>
  ` : ''}

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${brandColors.background};">
    <tr>
      <td align="center" style="padding: 40px 15px;">

        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: ${brandColors.white}; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: ${brandColors.white}; font-size: 28px; font-weight: bold;">
                Keep Hearing Initiative
              </h1>
              <p style="margin: 10px 0 0 0; color: ${brandColors.white}; font-size: 14px; opacity: 0.9;">
                Empowering Communication, Connecting Communities
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${brandColors.background}; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0 0 10px 0; color: ${brandColors.textLight}; font-size: 14px;">
                <strong>Keep Hearing Initiative</strong>
              </p>
              <p style="margin: 0 0 15px 0; color: ${brandColors.textLight}; font-size: 12px; line-height: 1.6;">
                Supporting hearing health and accessible communication<br>
                A 501(c)(3) nonprofit organization
              </p>
              <p style="margin: 0; font-size: 12px;">
                <a href="https://keephearing.org" style="color: ${brandColors.secondary}; text-decoration: none; margin: 0 10px;">Website</a>
                <a href="https://keephearing.org/about" style="color: ${brandColors.secondary}; text-decoration: none; margin: 0 10px;">About</a>
                <a href="https://keephearing.org/contact" style="color: ${brandColors.secondary}; text-decoration: none; margin: 0 10px;">Contact</a>
              </p>
              <p style="margin: 15px 0 0 0; color: ${brandColors.textLight}; font-size: 11px;">
                © ${new Date().getFullYear()} Keep Hearing Initiative. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

/**
 * Template: Contact Form Submission (Admin Notification)
 */
export function contactFormAdminNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  timestamp: string;
}): string {
  const content = `
    <h2 style="margin: 0 0 20px 0; color: ${brandColors.primary}; font-size: 24px; font-weight: bold;">
      New Contact Form Submission
    </h2>

    <div style="background-color: ${brandColors.background}; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 8px 0; color: ${brandColors.textLight}; font-size: 13px; font-weight: 600; text-transform: uppercase;">
            From:
          </td>
        </tr>
        <tr>
          <td style="padding: 0 0 15px 0;">
            <strong style="color: ${brandColors.text}; font-size: 16px;">${data.name}</strong><br>
            <a href="mailto:${data.email}" style="color: ${brandColors.secondary}; text-decoration: none; font-size: 14px;">
              ${data.email}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 8px 0; color: ${brandColors.textLight}; font-size: 13px; font-weight: 600; text-transform: uppercase;">
            Subject:
          </td>
        </tr>
        <tr>
          <td style="padding: 0 0 15px 0; color: ${brandColors.text}; font-size: 16px; font-weight: 500;">
            ${data.subject}
          </td>
        </tr>

        <tr>
          <td style="padding: 8px 0; color: ${brandColors.textLight}; font-size: 13px; font-weight: 600; text-transform: uppercase;">
            Message:
          </td>
        </tr>
        <tr>
          <td style="padding: 0; color: ${brandColors.text}; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
            ${data.message.replace(/\n/g, '<br>')}
          </td>
        </tr>
      </table>
    </div>

    <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; margin-top: 20px;">
      <p style="margin: 0 0 15px 0; color: ${brandColors.textLight}; font-size: 13px;">
        <strong>Submission Details:</strong>
      </p>
      <p style="margin: 0; color: ${brandColors.textLight}; font-size: 12px; line-height: 1.6;">
        Time: ${data.timestamp}<br>
        ${data.ip ? `IP Address: ${data.ip}<br>` : ''}
        Source: Contact Form - Website
      </p>
    </div>

    <div style="margin-top: 30px; text-align: center;">
      <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}"
         style="display: inline-block; background-color: ${brandColors.primary}; color: ${brandColors.white}; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
        Reply to ${data.name}
      </a>
    </div>

    <p style="margin: 25px 0 0 0; padding: 15px; background-color: #FEF3C7; border-left: 4px solid ${brandColors.accent}; color: #78350F; font-size: 13px; border-radius: 4px; line-height: 1.6;">
      <strong>Quick Tip:</strong> Respond within 24 hours to provide the best supporter experience. You can also view and manage all contact submissions in the <a href="http://localhost:3000/admin" style="color: ${brandColors.primary}; text-decoration: underline;">admin dashboard</a>.
    </p>
  `;

  return emailWrapper(content, `New contact form submission from ${data.name}`);
}

/**
 * Template: Auto-reply to Contact Form Submitter
 */
export function contactFormAutoReply(data: {
  name: string;
  subject: string;
}): string {
  const content = `
    <h2 style="margin: 0 0 20px 0; color: ${brandColors.primary}; font-size: 24px; font-weight: bold;">
      Thank You for Contacting Us!
    </h2>

    <p style="margin: 0 0 20px 0; color: ${brandColors.text}; font-size: 16px; line-height: 1.6;">
      Dear ${data.name},
    </p>

    <p style="margin: 0 0 20px 0; color: ${brandColors.text}; font-size: 16px; line-height: 1.6;">
      We've received your message about "<strong>${data.subject}</strong>" and wanted to let you know that our team is reviewing it.
    </p>

    <div style="background-color: ${brandColors.background}; padding: 25px; border-radius: 6px; border-left: 4px solid ${brandColors.secondary}; margin: 30px 0;">
      <h3 style="margin: 0 0 15px 0; color: ${brandColors.primary}; font-size: 18px; font-weight: bold;">
        What Happens Next?
      </h3>
      <ul style="margin: 0; padding: 0 0 0 20px; color: ${brandColors.text}; font-size: 14px; line-height: 1.8;">
        <li>Our team will review your message carefully</li>
        <li>You can expect a response within 24-48 hours</li>
        <li>We'll reach out if we need any additional information</li>
      </ul>
    </div>

    <p style="margin: 0 0 20px 0; color: ${brandColors.text}; font-size: 16px; line-height: 1.6;">
      In the meantime, here are some resources that might be helpful:
    </p>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 25px 0;">
      <tr>
        <td style="padding: 15px; background-color: #DBEAFE; border-radius: 6px; margin-bottom: 10px;">
          <strong style="color: ${brandColors.primary}; font-size: 14px; display: block; margin-bottom: 5px;">
            📚 Educational Resources
          </strong>
          <a href="http://localhost:3000/learn" style="color: ${brandColors.secondary}; text-decoration: none; font-size: 14px;">
            Learn about hearing health and accessibility
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 15px; background-color: #D1FAE5; border-radius: 6px; margin: 10px 0;">
          <strong style="color: ${brandColors.primary}; font-size: 14px; display: block; margin-bottom: 5px;">
            🤝 Get Involved
          </strong>
          <a href="http://localhost:3000/participate" style="color: ${brandColors.secondary}; text-decoration: none; font-size: 14px;">
            Find out how you can support our mission
          </a>
        </td>
      </tr>
      <!-- Donation section temporarily removed - will be added in future phase -->
    </table>

    <p style="margin: 30px 0 0 0; color: ${brandColors.text}; font-size: 16px; line-height: 1.6;">
      Thank you for your interest in the Keep Hearing Initiative. Together, we're making communication accessible for everyone.
    </p>

    <p style="margin: 20px 0 0 0; color: ${brandColors.text}; font-size: 16px; line-height: 1.6;">
      Warm regards,<br>
      <strong style="color: ${brandColors.primary};">The Keep Hearing Team</strong>
    </p>
  `;

  return emailWrapper(content, "We've received your message - Keep Hearing Initiative");
}

/**
 * Template: Donation Thank You
 */
export function donationThankYou(data: {
  donorName: string;
  amount: number;
  currency: string;
  date: string;
  recurring: boolean;
}): string {
  const content = `
    <h2 style="margin: 0 0 20px 0; color: ${brandColors.primary}; font-size: 24px; font-weight: bold;">
      Thank You for Your Generous ${data.recurring ? 'Recurring ' : ''}Donation!
    </h2>

    <p style="margin: 0 0 20px 0; color: ${brandColors.text}; font-size: 16px; line-height: 1.6;">
      Dear ${data.donorName},
    </p>

    <p style="margin: 0 0 30px 0; color: ${brandColors.text}; font-size: 16px; line-height: 1.6;">
      Your ${data.recurring ? 'monthly ' : ''}donation of <strong style="color: ${brandColors.primary}; font-size: 20px;">${data.currency} $${data.amount.toLocaleString()}</strong> is making a real difference in the lives of individuals with hearing loss.
    </p>

    <div style="background: linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%); padding: 30px; border-radius: 8px; text-align: center; margin: 30px 0;">
      <p style="margin: 0; color: ${brandColors.white}; font-size: 18px; font-weight: bold;">
        Your Impact
      </p>
      <div style="margin: 20px 0; padding: 20px; background-color: rgba(255,255,255,0.1); border-radius: 6px;">
        <p style="margin: 0; color: ${brandColors.white}; font-size: 14px; line-height: 1.8;">
          ${data.recurring
            ? 'Your monthly support helps us plan long-term initiatives and provide consistent support to those who need it most.'
            : 'Your one-time contribution helps us continue our mission to make communication accessible for everyone.'}
        </p>
      </div>
    </div>

    <div style="background-color: ${brandColors.background}; padding: 25px; border-radius: 6px; margin: 30px 0;">
      <h3 style="margin: 0 0 15px 0; color: ${brandColors.primary}; font-size: 18px; font-weight: bold;">
        Donation Receipt
      </h3>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px; color: ${brandColors.text};">
        <tr>
          <td style="padding: 8px 0; color: ${brandColors.textLight};">Amount:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600;">${data.currency} $${data.amount.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: ${brandColors.textLight};">Date:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600;">${data.date}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: ${brandColors.textLight};">Type:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600;">${data.recurring ? 'Monthly Recurring' : 'One-time'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: ${brandColors.textLight};">Tax ID:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600;">XX-XXXXXXX</td>
        </tr>
      </table>
      <p style="margin: 15px 0 0 0; padding: 15px; background-color: ${brandColors.white}; border-radius: 4px; font-size: 12px; color: ${brandColors.textLight}; line-height: 1.6;">
        <strong>Tax Information:</strong> Keep Hearing Initiative is a 501(c)(3) nonprofit organization. Your donation is tax-deductible to the extent allowed by law. Please save this receipt for your records.
      </p>
    </div>

    <p style="margin: 30px 0 0 0; color: ${brandColors.text}; font-size: 16px; line-height: 1.6;">
      We're honored to have your support. Thank you for believing in our mission!
    </p>

    <p style="margin: 20px 0 0 0; color: ${brandColors.text}; font-size: 16px; line-height: 1.6;">
      With gratitude,<br>
      <strong style="color: ${brandColors.primary};">The Keep Hearing Team</strong>
    </p>
  `;

  return emailWrapper(content, `Thank you for your ${data.currency} $${data.amount.toLocaleString()} donation!`);
}
