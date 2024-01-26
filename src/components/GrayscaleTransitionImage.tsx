'use client';

import { useRef } from 'react';

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image, { type ImageProps } from 'next/image';

const MotionImage = motion(Image);

export function GrayscaleTransitionImage(
  props: Pick<
    ImageProps,
    'src' | 'quality' | 'className' | 'sizes' | 'priority'
  > & { alt?: string },
) {
  const ref = useRef<React.ElementRef<'div'>>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 35%'],
  });
  const grayscale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1]);
  const filter = useMotionTemplate`grayscale(${grayscale})`;

  return (
    <div ref={ref} className="group relative">
      <MotionImage alt="" style={{ filter } as any} {...props} />
      <div
        className="pointer-events-none absolute left-0 top-0 w-full opacity-0 transition duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <Image alt="" {...props} />
      </div>
    </div>
  );
}
