interface Props {
  name: string;
}

export default function Icon({ name }: Props) {
  if (name === 'gear') {
    return (
      <svg
        className='size-4'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='18' cy='15' r='3' />
        <circle cx='9' cy='7' r='4' />
        <path d='M10 15H6a4 4 0 0 0-4 4v2' />
        <path d='m21.7 16.4-.9-.3' />
        <path d='m15.2 13.9-.9-.3' />
        <path d='m16.6 18.7.3-.9' />
        <path d='m19.1 12.2.3-.9' />
        <path d='m19.6 18.7-.4-1' />
        <path d='m16.8 12.3-.4-1' />
        <path d='m14.3 16.6 1-.4' />
        <path d='m20.7 13.8 1-.4' />
      </svg>
    );
  }
  if (name === 'book') {
    return (
      <svg
        className='size-4'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
        <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
      </svg>
    );
  }
  if (name === 'pages') {
    return (
      <svg
        className='size-4'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z' />
        <path d='M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8' />
        <path d='M15 2v5h5' />
      </svg>
    );
  }
}
