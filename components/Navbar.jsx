'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Lemon } from 'next/font/google';
import { Menu, Sparkle } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import { UserAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const font = Lemon({ weight: '400', subsets: ['latin-ext'] });

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const { user, signInWithGoogle, logOut } = UserAuth();
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      redirect('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthenication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthenication();
  }, [user]);

  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary'>
      <div className='flex items-center'>
        <Menu className='block md:hidden' />
        <Link href='/' className='cursor-pointer'>
          <h1 className={cn('hidden md:block text-xl md:text-3xl font-bold text-primary', font.className)}>Zagzook Games</h1>
        </Link>
      </div>
      <div className='flex items-center gap-x-4'>
        <Button size='sm' variant='premium'>
          Upgrade
          <Sparkle className='h-4 w-4 fill-white text-white ml-8' />
        </Button>
        <ModeToggle />
        {loading ? null : !user ? (
          <>
            <div className='p-2 cursor-pointer' onClick={handleSignIn}>
              Sign In/Register
            </div>
          </>
        ) : (
          <>
            <div className='p-2 cursor-pointer' onClick={handleLogOut}>
              welcome {user.displayName}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
