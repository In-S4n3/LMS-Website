'use client';
import { useState } from 'react';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { IoMdAnalytics } from 'react-icons/io';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';

import { Logo, Logomark } from '@/src/components/Logo';

import { UserButton } from './UserButton';

const navItems = [
  {
    icon: <LiaChalkboardTeacherSolid fill="white" />,
    label: 'Courses',
    href: '/dashboard/courses',
  },
  {
    icon: <IoMdAnalytics fill="white" />,
    label: 'Analytics',
    href: '/dashboard/analytics',
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
      className="bg-gradient-to-br from-indigo-100 to-white"
    >
      <AppShell.Header className="border-neutral-900 bg-gradient-to-r from-neutral-900 to-indigo-950">
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
      <AppShell.Navbar
        p="md"
        className="flex justify-between border-neutral-900 bg-gradient-to-b from-neutral-900 to-indigo-950"
      >
        <div>
          {navItems.map((item, index) => (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setActive(index)}
              className={clsx(
                'my-1 flex items-center gap-x-2 rounded-lg py-4 pl-2 font-semibold text-indigo-200 shadow-xl hover:bg-indigo-400/10 hover:text-indigo-400',
                active === index && 'bg-indigo-400/10 text-xl text-indigo-400',
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
        <UserButton user={user} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
