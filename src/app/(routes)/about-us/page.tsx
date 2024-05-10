'use server';

import ComingSoon from '@/app/ui/comingSoon';

export default async function Home() {
  return (
    <div className='relative flex-grow'>
      <ComingSoon />
    </div>
  );
}
