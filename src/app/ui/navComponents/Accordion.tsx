import AccordionLink from './AccordionLink';
import Icon from './Icon';
import { AccordionContent } from '@/app/lib/definitions';

interface Props {
  activeAccordion: string[];
  toggleAccordion: (path: string[]) => void;
  label: string;
  contents: AccordionContent[];
  depth: number;
  id: string[];
  icon?: 'gear' | 'book' | 'pages';
}

export default function Accordion(props: Props) {
  const contents: JSX.Element[] = [];
  props.contents.forEach((el) => {
    if (el.type === 'Link') {
      contents.push(
        <AccordionLink path={el.path as string} label={el.label} />
      );
    } else {
      contents.push(
        <Accordion
          activeAccordion={props.activeAccordion}
          toggleAccordion={props.toggleAccordion}
          label={el.label}
          contents={el.contents as AccordionContent[]}
          depth={props.depth + 1}
          id={el.id as string[]}
        />
      );
    }
  });

  return (
    <li className='hs-accordion' id={props.id[props.id.length - 1]}>
      <button
        type='button'
        className={`hs-accordion-toggle ${
          props.activeAccordion[props.depth] === props.id[props.id.length - 1]
            ? 'hs-accordion-active:text-blue-600'
            : ''
        } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600`}
        onClick={() => props.toggleAccordion(props.id)}
      >
        {props.icon && <Icon name={props.icon} />}
        {props.label}
        <svg
          className='hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
          <path d='m18 15-6-6-6 6' />
        </svg>
        <svg
          className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500dark:text-gray-400'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          ></path>
        </svg>
      </button>

      <div
        id={props.id[props.id.length - 1]}
        className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
          props.activeAccordion[props.depth] === props.id[props.id.length - 1]
            ? 'block'
            : 'hidden'
        }`}
      >
        <ul className='pt-2 ps-2 space-y-1.5'>{contents}</ul>
      </div>
    </li>
  );
}
