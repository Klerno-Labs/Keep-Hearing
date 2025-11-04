import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import {
  contactFormAdminNotification,
  contactFormAutoReply,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip = getClientIp(request);

    // Rate limiting check - 3 submissions per 15 minutes
    const rateLimitResponse = rateLimit(ip, {
      limit: 3,
      window: 15 * 60 * 1000, // 15 minutes
    });

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic protection)
    const sanitizedName = name.trim().substring(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().substring(0, 100);
    const sanitizedSubject = subject.trim().substring(0, 200);
    const sanitizedMessage = message.trim().substring(0, 2000);

    // Check for spam patterns
    const spamKeywords = ["viagra", "casino", "lottery", "prince", "inheritance"];
    const messageText = `${sanitizedName} ${sanitizedSubject} ${sanitizedMessage}`.toLowerCase();
    const isSpam = spamKeywords.some(keyword => messageText.includes(keyword));

    if (isSpam) {
      return NextResponse.json(
        { error: "Message appears to be spam" },
        { status: 400 }
      );
    }

    // Option 1: Send via Resend (if API key is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        const timestamp = new Date().toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "long",
        });

        // Send admin notification with beautiful template
        const adminEmailPromise = resend.emails.send({
          from: "Keep Hearing Contact Form <noreply@keephearing.org>",
          to: ["info@keephearing.org"], // Replace with your actual admin email
          reply_to: sanitizedEmail,
          subject: `New Contact: ${sanitizedSubject}`,
          html: contactFormAdminNotification({
            name: sanitizedName,
            email: sanitizedEmail,
            subject: sanitizedSubject,
            message: sanitizedMessage,
            ip: ip,
            timestamp: timestamp,
          }),
        });

        // Send auto-reply to submitter
        const autoReplyPromise = resend.emails.send({
          from: "Keep Hearing Initiative <noreply@keephearing.org>",
          to: [sanitizedEmail],
          subject: "We've received your message - Keep Hearing Initiative",
          html: contactFormAutoReply({
            name: sanitizedName,
            subject: sanitizedSubject,
          }),
        });

        // Send both emails in parallel
        await Promise.all([adminEmailPromise, autoReplyPromise]);

        return NextResponse.json({
          success: true,
          message: "Thank you! We've received your message and will respond within 24-48 hours. Check your inbox for a confirmation email."
        });
      } catch (error) {
        console.error("Resend error:", error);
        // Fall through to database storage if email fails
      }
    }

    // Option 2: Store in database (fallback if no email service)
    await prisma.contactSubmission.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        status: "new",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll respond within 24-48 hours.",
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly at info@keephearing.org" },
      { status: 500 }
    );
  }
}
