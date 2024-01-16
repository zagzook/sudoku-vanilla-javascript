import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const GameLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='hidden md:flex mt-16 w-40 flex-col fixed inset-y-0'>
        <Sidebar />
      </div>
      <main className='md:pl-20 pt-16 h-full'>{children}</main>
    </div>
  );
};

export default GameLayout;
