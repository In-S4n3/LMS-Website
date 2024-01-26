import Link from 'next/link';

import { emailValidationVerification } from '@/src/actions';
import { Container } from '@/src/components/Container';
import { FadeIn } from '@/src/components/FadeIn';

export const EmailVerification = async ({
  token,
}: {
  token: string | string[] | undefined;
}) => {
  const tokenValidation = await emailValidationVerification(token as string);
  const { error, success } = tokenValidation;

  return (
    <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        {success ? (
          <>
            <p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
              Thank you!
            </p>
            <h1 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
              {success}
            </h1>
            <p className="mt-2 font-display text-xl text-neutral-600">
              Please,{' '}
              <Link
                href="/sign-in"
                className="mt-4 text-xl font-semibold text-neutral-950 transition hover:text-neutral-700"
              >
                sign in
              </Link>{' '}
              to your account.
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
              {error}
            </h1>
            <p className="mt-2 font-display text-xl text-neutral-600">
              Please, try again.
            </p>
          </>
        )}
      </FadeIn>
    </Container>
  );
};
