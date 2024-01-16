'use client';

import { Grid2X2, Grid3x3, Home, Settings, WholeWord, LogOutIcon, Sparkle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

const Sidebar = () => {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const pathname = usePathname();
  const onNavigate = (url, pro) => {
    return router.push(url);
  };
  const routes = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: Home,
      pro: false,
    },
    {
      name: 'Sudoku Daily',
      path: '/sudokuDaily',
      icon: Grid2X2,
      pro: false,
    },
    {
      name: 'Word Daily',
      path: '/wordDaily',
      icon: WholeWord,
      pro: false,
    },
    {
      name: 'Sudoku 9X9',
      path: '/sudoku9x9Grid',
      icon: Grid3x3,
      pro: true,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      pro: true,
    },
  ];

  const handleLogOut = async () => {
    try {
      await logOut();
      redirect('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='space-y-4 flex flex-col h-full text-primary bg-secondary'>
      <div className='p-3 flex flex-1 text-center justify-center'>
        <div className='space-y-2'>
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.path, route.pro)}
              key={route.path}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname === route.path && 'bg-primary/10 text-primary'
              )}>
              <div className='flex flex-col gap-y-2 items-center flex-1'>
                <route.icon className='h-5 w-5' />
                {route.name}
              </div>
            </div>
          ))}

          <div
            onClick={handleLogOut}
            className={
              'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition'
            }>
            <div className='flex flex-col gap-y-2 items-center flex-1'>
              <LogOutIcon className='h-5 w-5' />
              SignOut
            </div>
          </div>
        </div>
      </div>
      <div className='mb-4 px-4 pb-40'>
        <Button size='sm' variant='premium'>
          Upgrade
          <Sparkle className='h-4 w-4 fill-white text-white ml-8' />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
