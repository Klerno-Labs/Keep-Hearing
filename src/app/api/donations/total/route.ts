import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  const total = await prisma.donation.aggregate({
    _sum: { amountCents: true }
  });
  // Convert cents to dollars for display
  return NextResponse.json({ total: (total._sum.amountCents || 0) / 100 });
}
