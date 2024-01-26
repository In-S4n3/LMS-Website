import { Button as MantineButton } from '@mantine/core';
import { ButtonProps, ElementProps } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';

interface Props extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  invert?: boolean;
  href?: string;
}

export function Button({
  invert = false,
  className,
  children,
  ...props
}: Props) {
  className = clsx(
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    className,
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200'
      : 'bg-neutral-950 text-white hover:bg-neutral-800',
  );

  const inner = <span className="relative top-px">{children}</span>;

  if (typeof props.href === 'undefined') {
    return (
      <MantineButton
        className={className}
        {...props}
        loaderProps={{ type: 'dots' }}
      >
        {inner}
      </MantineButton>
    );
  }

  return (
    <Link className={className} href={props.href}>
      {inner}
    </Link>
  );
}
