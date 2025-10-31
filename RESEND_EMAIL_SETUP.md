# Resend Email Service Setup Guide

## What is Resend?

Resend is a modern email API service that makes it easy to send transactional emails. Your nonprofit will use it to:
- Receive contact form submissions
- Send email notifications to staff
- Send confirmation emails to users (future feature)

## Step 1: Create a Resend Account

1. Go to [Resend](https://resend.com/)
2. Click "Sign Up" or "Get Started"
3. Create an account with your email
4. Verify your email address

## Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click "Create API Key"
4. Enter a name: "Keep Hearing Production" (or "Development" for testing)
5. Select permissions: **Full Access** (or "Sending access" for production)
6. Click "Create"
7. **IMPORTANT**: Copy the API key immediately - you won't be able to see it again!
   - It looks like: `re_123456789abcdefghijklmnop`

## Step 3: Add Domain (Recommended for Production)

For production use, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click "Add Domain"
3. Enter your domain: `yourdomain.com`
4. Follow the DNS verification steps:
   - Add the provided TXT records to your domain's DNS settings
   - Add SPF, DKIM records for better deliverability
5. Wait for verification (can take a few minutes to 24 hours)

**Note**: For development/testing, you can skip domain verification and use Resend's default sending domain.

## Step 4: Configure Your Application

1. Open your `.env` file
2. Find the line:
   ```
   # RESEND_API_KEY="re_..."
   ```
3. Uncomment it and add your actual API key:
   ```
   RESEND_API_KEY="re_123456789abcdefghijklmnop"
   ```
4. Save the file

## Step 5: Update Contact Form Handler

The contact form is already set up to use Resend. Make sure to configure the recipient email address:

1. Open [src/app/api/contact/route.ts](src/app/api/contact/route.ts)
2. Update the recipient email address on line ~60:
   ```typescript
   to: ['your-nonprofit@example.com'], // Replace with your actual email
   ```
3. Optionally update the "from" address (if you verified a domain):
   ```typescript
   from: 'noreply@yourdomain.com',
   ```

## Step 6: Test the Setup

1. Restart your development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the contact form
4. Check:
   - Database: Contact submission should be saved
   - Email: You should receive an email notification
   - Resend Dashboard: Check the "Logs" section to see the email was sent

## Pricing (as of 2024)

Resend offers generous free tier:
- **Free**: 3,000 emails/month
- **Pro**: $20/month for 50,000 emails

For most small nonprofits, the free tier is more than enough for contact form notifications.

## Production Deployment

When deploying to production (Vercel, Railway, etc.):

1. Add the environment variable in your hosting platform:
   - Variable name: `RESEND_API_KEY`
   - Value: Your production API key
2. Use a domain-verified "from" address for better deliverability
3. Consider creating separate API keys for development vs production

## Email Templates

The current implementation sends plain text emails. To enhance:

1. Add HTML templates in the Resend API call
2. Use React Email for better templates (Resend supports this)
3. Add your nonprofit's branding

Example of adding HTML:
```typescript
await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: ['admin@yourdomain.com'],
  subject: `New Contact Form: ${subject}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});
```

## Security Best Practices

1. **Never commit API keys**: Always use environment variables
2. **Use different keys**: Separate keys for dev/staging/production
3. **Rotate keys**: Periodically rotate API keys for security
4. **Limit permissions**: Use minimum required permissions for each key
5. **Monitor usage**: Check Resend dashboard for suspicious activity

## Troubleshooting

**Emails not sending?**
- Verify your API key is correct in `.env`
- Check Resend dashboard → Logs for error messages
- Ensure you restarted the server after adding the API key
- Check spam folder

**Domain verification failing?**
- DNS changes can take 24-48 hours to propagate
- Double-check DNS records match exactly
- Use a DNS checker tool to verify records are live

**Rate limiting?**
- Free tier has daily limits
- Upgrade to Pro if needed
- Implement email queuing for high volume

## Alternative Email Services

If you prefer alternatives:
- **SendGrid**: Similar pricing, well-established
- **Mailgun**: Good for high volume
- **AWS SES**: Very cheap but requires AWS account
- **Postmark**: Premium service, excellent deliverability

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend React Email](https://react.email/)
- [Vercel + Resend Guide](https://resend.com/docs/send-with-nextjs)
