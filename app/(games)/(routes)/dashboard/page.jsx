'use client';

import Spinner from '@/components/spinner';
import { UserAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthenication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthenication();
  }, [user]);

  return (
    <>
      {loading ? (
        <div className='p-4'>
          <Spinner />
        </div>
      ) : !user ? (
        <>
          <div className='p-4'>You must be logged in to view this page (protected)</div>;
        </>
      ) : (
        <>
          <div className='p-2 cursor-pointer'>welcome {user.displayName} you are logged in</div>
        </>
      )}
    </>
  );
};

export default DashboardPage;
