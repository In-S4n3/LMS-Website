'use client';

import { useEffect, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput, TextInput } from '@mantine/core';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@/actions';
import { LoginSchema } from '@/schemas';
import { Button } from '@/src/components/Button';
import { Feedback } from '@/src/components/Feedback';

import { Social } from './Social';

export const SignInForm = () => {
  const queryParams = useSearchParams();
  const isAuthErrorQuery = queryParams.get('error') === 'OAuthAccountNotLinked';
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const signInForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };

  useEffect(() => {
    if (isAuthErrorQuery) {
      setError('Email already in use with a different provider.');
    }
  }, [queryParams, isAuthErrorQuery]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={signInForm.handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <TextInput
                  {...signInForm.register('email')}
                  id="email"
                  radius="md"
                  className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  autoComplete="text"
                  disabled={isPending}
                  error={signInForm.formState.errors.email?.message}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-semibold text-indigo-700 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <PasswordInput
                  {...signInForm.register('password')}
                  id="password"
                  radius="md"
                  autoComplete="current-password"
                  className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  disabled={isPending}
                  error={signInForm.formState.errors.password?.message}
                />
              </div>
              {error && <Feedback error={error} />}
              {success && <Feedback success={success} />}
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center"
                loading={isPending}
              >
                Sign In
              </Button>
            </div>
          </form>
          <Social className="py-10" />
          <p className="text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              href="/sign-up"
              className="font-semibold leading-6 text-indigo-700 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
