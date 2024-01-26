'use client';
import { useState } from 'react';

import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaVideo } from 'react-icons/fa';
import { ImBlogger } from 'react-icons/im';

import { Logo, Logomark } from '@/src/components/Logo';

import { UserButton } from './UserButton';

const navItems = [
  {
    icon: <FaVideo fill="white" />,
    label: 'Manage Videos',
    href: '/dashboard/videos',
  },
  {
    icon: <ImBlogger fill="white" />,
    label: 'Manage Blog',
    href: '/dashboard/blog',
  },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const [logoHovered, setLogoHovered] = useState(false);
  const [opened, { toggle }] = useDisclosure();
  const session = useSession();
  const { user } = session.data || {};

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className="border-neutral-800 bg-neutral-900">
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color="white"
          />
          <Link
            href="/"
            aria-label="Home"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <Logomark className="h-8 sm:hidden" filled={logoHovered} invert />
            <Logo className="hidden h-8 sm:block" filled={logoHovered} invert />
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className="flex justify-between bg-neutral-900">
        <div>
          {navItems.map((item, index) => (
            <NavLink
              {...item}
              key={item.label}
              active={index === active}
              onClick={() => setActive(index)}
              className={clsx(
                'rounded-lg py-8 font-semibold text-indigo-400 shadow-xl hover:bg-indigo-400/10 hover:text-indigo-200',
                active === index && 'bg-indigo-400/10 text-2xl text-indigo-200',
              )}
              leftSection={item.icon}
            />
          ))}
        </div>
        <UserButton user={user} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
