'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { forgotPassword } from '@/actions';
import { ForgotPasswordSchema } from '@/schemas';
import { Button } from '@/src/components/Button';
import { Feedback } from '@/src/components/Feedback';

export const ForgotPassword = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const forgotPasswordForm = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      forgotPassword(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot your password?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
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
                  {...forgotPasswordForm.register('email')}
                  id="email"
                  radius="md"
                  className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  autoComplete="text"
                  disabled={isPending}
                  error={forgotPasswordForm.formState.errors.email?.message}
                />
              </div>
            </div>

            <div>
              {error && <Feedback error={error} />}
              {success && <Feedback success={success} />}
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center"
                loading={isPending}
              >
                Send reset link
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
