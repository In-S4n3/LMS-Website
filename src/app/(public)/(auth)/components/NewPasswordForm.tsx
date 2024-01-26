'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { newPassword } from '@/src/actions';
import { Button } from '@/src/components/Button';
import { Feedback } from '@/src/components/Feedback';
import { NewPasswordSchema } from '@/src/schemas';

export const NewPasswordForm = ({
  token,
}: {
  token: string | string[] | undefined;
}) => {
  const [visible, { toggle }] = useDisclosure(false);
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const newPasswordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      newPassword(values, token as string).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
    setTimeout(() => {
      push('/sign-in');
    }, 3500);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={newPasswordForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New password
            </label>
          </div>
          <div className="mt-2">
            <PasswordInput
              {...newPasswordForm.register('password')}
              id="password"
              radius="md"
              autoComplete="current-password"
              className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              disabled={isPending}
              error={newPasswordForm.formState.errors.password?.message}
              visible={visible}
              onVisibilityChange={toggle}
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm password
            </label>
          </div>
          <div className="mt-2">
            <PasswordInput
              {...newPasswordForm.register('confirmPassword')}
              id="confirmPassword"
              radius="md"
              autoComplete="current-password"
              className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              disabled={isPending}
              error={newPasswordForm.formState.errors.confirmPassword?.message}
              visible={visible}
              onVisibilityChange={toggle}
            />
          </div>
          {error && <Feedback error={error} />}
          {success && <Feedback success={success} />}
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center"
              loading={isPending}
            >
              Set new password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
