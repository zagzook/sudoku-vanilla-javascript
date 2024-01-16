import Image from 'next/image';
import spinner from '@/public/img/spinner.gif';

const Spinner = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Image src={spinner} priority={true} alt='Loading...' />
    </div>
  );
};

export default Spinner;
