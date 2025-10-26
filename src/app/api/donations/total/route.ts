import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  const total = await prisma.donation.aggregate({
    _sum: { amount: true }
  });
  return NextResponse.json({ total: total._sum.amount || 0 });
}
