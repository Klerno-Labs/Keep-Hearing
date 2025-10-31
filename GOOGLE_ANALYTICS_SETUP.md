# Google Analytics 4 Setup Guide

## Step 1: Create a Google Analytics 4 Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account (or create one)
3. Click "Start measuring" or "Admin" (gear icon)

## Step 2: Set Up a Property

1. Click "Create Property"
2. Enter property details:
   - **Property name**: "Keep Hearing" (or your nonprofit name)
   - **Reporting time zone**: Select your timezone
   - **Currency**: USD (or your preferred currency)
3. Click "Next"

## Step 3: Configure Property Settings

1. Select your industry category: "Non-Profit"
2. Select business size
3. Select how you plan to use Google Analytics (check relevant options)
4. Click "Create"
5. Accept the Terms of Service

## Step 4: Set Up Data Stream

1. Select platform: **Web**
2. Enter your website URL: `https://yourdomain.com`
3. Enter stream name: "Keep Hearing Website"
4. Click "Create stream"

## Step 5: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX`
3. Copy this ID

## Step 6: Add to Your Application

1. Open your `.env` file
2. Find or add the line:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
   ```
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID
4. Save the file
5. Restart your development server

## Step 7: Verify Installation

1. Start your development server: `npm run dev`
2. Open your website in a browser
3. Go back to Google Analytics
4. Navigate to Reports → Realtime
5. You should see your active session

## Important Notes

- **Cookie Consent**: The site includes a cookie consent banner that users must accept before GA tracking begins
- **Privacy**: Make sure to update your Privacy Policy to mention Google Analytics
- **Production**: When deploying, add the same environment variable to your production environment

## Enhanced eCommerce Tracking (Optional)

If you want to track donations as transactions:

1. In GA4, go to Admin → Events
2. Create custom events for donation tracking
3. Set up conversion goals

## Additional Features to Consider

- **Event Tracking**: Track button clicks, form submissions, etc.
- **User Demographics**: Enable in GA4 settings
- **Site Search Tracking**: If you add search functionality
- **Custom Dimensions**: Track user roles, donation amounts, etc.

## Useful Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 for Nonprofits](https://www.google.com/nonprofits/offerings/google-analytics/)
- [Google for Nonprofits Program](https://www.google.com/nonprofits/)

## Troubleshooting

**Not seeing data?**
- Check that your Measurement ID is correct
- Verify the environment variable is loaded (check browser console)
- Make sure you accepted the cookie consent banner
- Check browser console for errors
- Ensure ad blockers aren't blocking GA

**Want to test without affecting production data?**
- Create a separate GA4 property for development
- Use different Measurement IDs for dev vs production
