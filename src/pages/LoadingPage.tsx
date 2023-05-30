import { BounceLoader } from 'react-spinners';

export default function LoadingPage() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <BounceLoader color='#0176d6' loading={true} />
    </div>
  );
}
