import { FadeIn } from '@/src/components/FadeIn';

import { ForgotPassword } from '../components/ForgotPassword';

const ForgotPasswordPage = () => {
  return (
    <FadeIn className="flex h-full flex-1" transition={{ duration: 1.5 }}>
      <ForgotPassword />
    </FadeIn>
  );
};

export default ForgotPasswordPage;
