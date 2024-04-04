// Import necessary libraries and components
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Accordion from './Accordion';
import { AccordionContent } from '@/app/lib/definitions';
import {
  modAccordion,
  libAccordion,
  docAccordion,
} from '@/app/lib/accordionData';

interface props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the Sidenav component
export default function Sidenav({ sidebarOpen, setSidebarOpen }: props) {
  // Define state for sidebar expansion
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string[]>([]);

  // Create a reference to the sidebar element
  const sidebar = useRef(null);

  // Effect to add or remove a className to the body element based on sidebar expansion
  useEffect(() => {
    if (sidebarExpanded) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // Function to toggle accordion item
  const toggleAccordion = (path: string[]) => {
    const newPath = path.slice();
    if (activeAccordion.includes(newPath[newPath.length - 1])) newPath.pop();
    setActiveAccordion(newPath);
  };

  return (
    <div
      ref={sidebar}
      id='docs-sidebar'
      className={`fixed inset-y-0 left-0 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 flex flex-col`}
    >
      <div className='px-6 pt-5'>
        <p
          className='flex-grow text-xl font-semibold dark:text-white'
          aria-label='Brand'
        >
          xFlair
        </p>
      </div>
      <nav
        className='hs-accordion-group p-6 w-full flex flex-col flex-wrap'
        data-hs-accordion-always-open
      >
        <ul className='space-y-1.5'>
          <li>
            <Link
              className='flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              href={'/'}
            >
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
                <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                <polyline points='9 22 9 12 15 12 15 22' />
              </svg>
              Home
            </Link>
          </li>
          <Accordion
            activeAccordion={activeAccordion}
            toggleAccordion={toggleAccordion}
            label={modAccordion.label}
            contents={modAccordion.contents as AccordionContent[]}
            depth={0}
            id={modAccordion.id as string[]}
            icon={modAccordion.icon}
          />

          <Accordion
            activeAccordion={activeAccordion}
            toggleAccordion={toggleAccordion}
            label={libAccordion.label}
            contents={libAccordion.contents as AccordionContent[]}
            depth={0}
            id={libAccordion.id as string[]}
            icon={libAccordion.icon}
          />
          <Accordion
            activeAccordion={activeAccordion}
            toggleAccordion={toggleAccordion}
            label={docAccordion.label}
            contents={docAccordion.contents as AccordionContent[]}
            depth={0}
            id={docAccordion.id as string[]}
            icon={docAccordion.icon}
          />
          <li>
            <Link
              className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              href='/about-us'
            >
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
                <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                <circle cx='9' cy='7' r='4' />
                <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
                <path d='M16 3.13a4 4 0 0 1 0 7.75' />
              </svg>
              About us
            </Link>
          </li>
        </ul>
      </nav>
      <div className='mt-auto w-full flex justify-center items-center bg-transparent pt-5 pb-20'>
        <img
          className='h-20 w-30 object-contain'
          src='/xflair_logo_clear.png'
          alt='titleText'
        />
      </div>
    </div>
  );
}
