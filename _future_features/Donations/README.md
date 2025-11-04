# Future Feature: Donations & Transparency

This folder contains donation and transparency-related features that have been temporarily removed from the active codebase. These features will be reintegrated when the organization is ready to accept donations.

## Contents

### 1. Donation Page (`donate/`)
- **Original Location**: `src/app/donate/page.tsx`
- **Description**: Complete donation page with one-time and monthly donation options, preset amounts, and impact messaging
- **Features**:
  - One-time and recurring donation options
  - Preset donation amounts ($25, $50, $100, $250)
  - Custom amount input
  - Impact examples showing what donations fund
  - Trust badges (501(c)(3) status, secure payments, tax receipts)

### 2. Donations API (`api-donations/`)
- **Original Location**: `src/app/api/donations/`
- **Description**: API routes for handling donation data
- **Endpoints**:
  - `/api/donations` - Main donation route
  - `/api/donations/recent` - Fetch recent donations
  - `/api/donations/total` - Get total donation amounts

### 3. Transparency Page (`transparency/`)
- **Original Location**: `src/app/transparency/page.tsx`
- **Description**: Nonprofit transparency and financial reporting page
- **Features**:
  - 501(c)(3) status information
  - IRS Form 990 download section
  - Annual reports section
  - Financial breakdown showing how donations are used
  - Board of Directors information
  - Governing documents access
  - Legal compliance information
  - State registration details

### 4. Test Files
- **File**: `donationAnalytics.test.tsx`
- **Original Location**: `src/app/admin/__tests__/donationAnalytics.test.tsx`
- **Description**: Test suite for donation analytics functionality

## Code References Removed

The following references were removed or commented out in the active codebase:

1. **Navigation** (`src/components/Navigation.tsx`)
   - Removed "Donate" link from desktop navigation (line 30-32)
   - Removed "Donate" link from mobile menu (line 89-95)

2. **Homepage** (`src/app/page.tsx`)
   - Commented out "Make a Donation" button (line 341)

3. **Footer** (`src/app/layout.tsx`)
   - Removed "View Financial Reports & Transparency" link (line 47)

4. **Email Templates** (`src/lib/email-templates.ts`)
   - Commented out "Support Our Work" donation section (line 241-250)

## Database Schema

The following database tables related to donations exist in the schema:

- **Donation** table in `prisma/schema.prisma`
  - Fields: id, userId, amount, frequency, status, paymentMethod, transactionId, createdAt

## Additional Files That Reference Donations

These files contain donation-related code or references but were not moved as they serve multiple purposes:

- `prisma/schema.prisma` - Contains Donation model
- `src/app/api/admin/dashboard/route.ts` - Includes donation analytics
- `src/lib/audit.ts` - Includes donation-related audit logging
- `src/lib/validation.ts` - Contains donation validation logic
- Documentation files (*.md) - Various mentions in documentation

## Re-integration Checklist

When ready to re-enable donation functionality:

1. [ ] Move `donate/` folder back to `src/app/donate/`
2. [ ] Move `api-donations/` folder back to `src/app/api/donations/`
3. [ ] Move `transparency/` folder back to `src/app/transparency/`
4. [ ] Restore donation navigation links in `src/components/Navigation.tsx`
5. [ ] Restore donation button on homepage `src/app/page.tsx`
6. [ ] Restore transparency link in footer `src/app/layout.tsx`
7. [ ] Restore donation section in email templates `src/lib/email-templates.ts`
8. [ ] Move test file back to `src/app/admin/__tests__/donationAnalytics.test.tsx`
9. [ ] Set up payment gateway integration (Stripe, PayPal, etc.)
10. [ ] Configure donation email notifications
11. [ ] Test all donation flows end-to-end
12. [ ] Update transparency page with actual board member information
13. [ ] Upload actual IRS determination letter and Form 990 documents
14. [ ] Verify tax-deductibility language is accurate
15. [ ] Test donation analytics in admin dashboard

## Notes

- The donation infrastructure is fully built and ready to use
- No hardcoded payment processing exists - needs to be integrated when ready
- All donation UI follows the brand guidelines (blue theme, responsive design)
- Transparency page includes SEO metadata for better discoverability
- Consider state registration requirements before accepting donations nationwide
