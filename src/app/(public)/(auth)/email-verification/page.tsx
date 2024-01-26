import { FadeIn } from '@/src/components/FadeIn';

import { EmailVerification } from '../components/EmailVerification';

const EmailVerificationPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams.token;

  return (
    <FadeIn className="flex h-full flex-1" transition={{ duration: 1.5 }}>
      <EmailVerification token={token} />
    </FadeIn>
  );
};

export default EmailVerificationPage;
