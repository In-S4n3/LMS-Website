import { FadeIn } from '@/src/components/FadeIn';

import { SignUpForm } from '../components/SignUpForm';

export default function SignUpPage() {
  return (
    <FadeIn className="flex h-full flex-1" transition={{ duration: 1.5 }}>
      <SignUpForm />
    </FadeIn>
  );
}
