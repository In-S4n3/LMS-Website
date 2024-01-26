import { FadeIn } from '@/src/components/FadeIn';

import { SignInForm } from '../components/SignInForm';

export default function SignInPage() {
  return (
    <FadeIn className="flex h-full flex-1" transition={{ duration: 1.5 }}>
      <SignInForm />
    </FadeIn>
  );
}
