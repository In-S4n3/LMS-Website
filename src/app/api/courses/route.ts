import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prismaClient';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { title } = await req.json();

    if (!session?.user) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const course = await prisma.course.create({
      data: {
        userId: session?.user.id as string,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log('[COURSES][POST][ERROR]', error);
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
