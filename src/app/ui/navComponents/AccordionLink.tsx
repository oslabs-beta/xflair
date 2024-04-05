import Link from 'next/link';

interface Props {
  path: string;
  label: string;
}

export default function AccordionLink(props: Props) {
  return (
    <li>
      <Link
        className={
        props.label === 'Classification'
       ? 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
       : 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
        }
        href={props.path}
      >
        {props.label}
      </Link>
    </li>
  );
}
