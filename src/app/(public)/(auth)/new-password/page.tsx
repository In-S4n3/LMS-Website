import { FadeIn } from '@/src/components/FadeIn';

import { NewPasswordForm } from '../components/NewPasswordForm';

const NewPasswordPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams.token;

  return (
    <FadeIn className="flex h-full flex-1" transition={{ duration: 1.5 }}>
      <NewPasswordForm token={token} />
    </FadeIn>
  );
};

export default NewPasswordPage;
