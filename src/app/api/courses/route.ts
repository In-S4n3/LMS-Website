import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    console.log(session);
    const { title } = await req.json();
    return new NextResponse('Ola', {
      status: 201,
    });
  } catch (error) {
    console.log('[COURSES][POST][ERROR]', error);
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
