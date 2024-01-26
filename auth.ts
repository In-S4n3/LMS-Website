import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { DefaultSession } from 'next-auth';

import authConfig from '@/auth.config';
import { prisma } from '@/lib/prismaClient';
import { getUserById } from '@/src/data/db';

declare module 'next-auth' {
  interface Session {
    user: {
      role: 'ADMIN' | 'USER';
    } & DefaultSession['user'];
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: '/sign-in',
    error: '/auth-error',
  },
  events: {
    // when a user user a OAuth auth provider this sets the emailVerified field to the current date once the OAuth providers already do that.
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id as string);

      if (existingUser && !existingUser.emailVerified) {
        return false;
      }

      return true;
    },
    //@ts-ignore
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token?.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;

      token.role = user.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
