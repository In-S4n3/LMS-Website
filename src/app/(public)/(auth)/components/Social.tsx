'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { Button } from '@/src/components/Button';

export const Social = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-center gap-x-4',
        className,
      )}
    >
      <Button
        className="flex size-full items-center justify-center rounded-lg bg-purple-50/35 hover:bg-purple-100/45"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="size-8" />
      </Button>
      <Button
        className="flex size-full items-center justify-center rounded-lg bg-purple-50/35 hover:bg-purple-100/45"
        onClick={() => onClick('github')}
      >
        <FaGithub className="size-8" fill="black" />
      </Button>
    </div>
  );
};
