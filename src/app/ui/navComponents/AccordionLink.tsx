import Link from 'next/link';

interface Props {
  path: string;
  label: string;
  name: string;
}

export default function AccordionLink(props: Props) {
  return (
    <li>
      <Link
        className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm ${
          props.name === 'tf-img-class-link'
            ? 'text-white text-slate-700 hover:text-slate-700'
            : 'text-slate-700'
        } rounded-lg border-solid border-2 border-gray-900 hover:bg-gray-100`}
        href={props.path}
      >
        {props.label}
      </Link>
    </li>
  );
}
