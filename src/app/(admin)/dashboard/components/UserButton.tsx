import { Avatar, Button, Menu, MenuDropdown, MenuTarget } from '@mantine/core';
import { PiSignOutLight } from 'react-icons/pi';

import { logout } from '@/src/actions';

export const UserButton = ({ user }: { user: any }) => {
  return (
    <Menu shadow="md" trigger="hover">
      <MenuTarget>
        <Button className="size-fit rounded-full">
          <div className="flex size-fit w-full items-center gap-x-4 rounded-full bg-black pr-4">
            <Avatar variant="filled" radius="xl" size="lg" src={user?.image} />
            <p className="font-semibold text-indigo-300">{user?.name}</p>
          </div>
        </Button>
      </MenuTarget>
      <MenuDropdown>
        <Menu.Item leftSection={<PiSignOutLight />} onClick={() => logout()}>
          Sign Out
        </Menu.Item>
      </MenuDropdown>
    </Menu>
  );
};
