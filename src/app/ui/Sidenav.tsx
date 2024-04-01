// Import necessary libraries and components
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface props {
  sidebarOpen: boolean,
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
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
    if (activeAccordion.includes(path[path.length - 1])) path.pop();
    setActiveAccordion(path);
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
        <a
          className='flex-grow text-xl font-semibold dark:text-white'
          href='#'
          aria-label='Brand'
        >
          xFlair
        </a>
      </div>
      <nav
        className='hs-accordion-group p-6 w-full flex flex-col flex-wrap'
        data-hs-accordion-always-open
      >
        <ul className='space-y-1.5'>
          <li>
            <a
              className='flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              href='#'
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
            </a>
          </li>

          <li className='hs-accordion' id='models-accordion'>
            <button
              type='button'
              className={`hs-accordion-toggle ${
                activeAccordion[0] === 'models-accordion'
                  ? 'hs-accordion-active:text-blue-600'
                  : ''
              } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
              onClick={() => toggleAccordion(['models-accordion'])}
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
              Models
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
                className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
              id='models-accordion'
              className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                activeAccordion[0] === 'models-accordion' ? 'block' : 'hidden'
              }`}
            >
              <ul
                className='hs-accordion-group ps-3 pt-2 space-y-1.5'
                data-hs-accordion-always-open
              >
                <li className='hs-accordion' id='m-tf-accordion'>
                  <button
                    type='button'
                    className={`hs-accordion-toggle ${
                      activeAccordion[1] === 'm-tf-accordion'
                        ? 'hs-accordion-active:text-blue-600'
                        : ''
                    } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                    onClick={() =>
                      toggleAccordion(['models-accordion', 'm-tf-accordion'])
                    }
                  >
                    TensorFlow
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
                      className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                      <path d='m6 9 6 6 6-6' />
                    </svg>
                  </button>

                  <div
                    id='m-tf-accordion'
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                      activeAccordion[1] === 'm-tf-accordion'
                        ? 'block'
                        : 'hidden'
                    }`}
                  >
                    <ul className='pt-2 ps-2 space-y-1.5'>
                      <li className='hs-accordion' id='m-tf-obj-accordion'>
                        <button
                          type='button'
                          className={`hs-accordion-toggle ${
                            activeAccordion[2] === 'm-tf-obj-accordion'
                              ? 'hs-accordion-active:text-blue-600'
                              : ''
                          } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                          onClick={() =>
                            toggleAccordion([
                              'models-accordion',
                              'm-tf-accordion',
                              'm-tf-obj-accordion',
                            ])
                          }
                        >
                          Objects
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
                            className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                            <path d='m6 9 6 6 6-6' />
                          </svg>
                        </button>

                        <div
                          id='m-tf-obj-accordion'
                          className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                            activeAccordion[2] === 'm-tf-obj-accordion'
                              ? 'block'
                              : 'hidden'
                          }`}
                        >
                          <ul className='pt-2 ps-2 space-y-1.5'>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Classification
                              </a>
                            </li>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Detection
                              </a>
                            </li>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Generation
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className='hs-accordion' id='m-tf-txt-accordion'>
                        <button
                          type='button'
                          className={`hs-accordion-toggle ${
                            activeAccordion[2] === 'm-tf-txt-accordion'
                              ? 'hs-accordion-active:text-blue-600'
                              : ''
                          } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                          onClick={() =>
                            toggleAccordion([
                              'models-accordion',
                              'm-tf-accordion',
                              'm-tf-txt-accordion',
                            ])
                          }
                        >
                          Text
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
                            className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                            <path d='m6 9 6 6 6-6' />
                          </svg>
                        </button>

                        <div
                          id='m-tf-txt-accordion'
                          className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                            activeAccordion[2] === 'm-tf-txt-accordion'
                              ? 'block'
                              : 'hidden'
                          }`}
                        >
                          <ul className='pt-2 ps-2 space-y-1.5'>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                LLMs
                              </a>
                            </li>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Text to Speech
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className='hs-accordion' id='m-py-accordion'>
                  <button
                    type='button'
                    className={`hs-accordion-toggle ${
                      activeAccordion[1] === 'm-py-accordion'
                        ? 'hs-accordion-active:text-blue-600'
                        : ''
                    } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                    onClick={() =>
                      toggleAccordion(['models-accordion', 'm-py-accordion'])
                    }
                  >
                    PyTorch
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
                      className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                      <path d='m6 9 6 6 6-6' />
                    </svg>
                  </button>

                  <div
                    id='m-py-accordion'
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                      activeAccordion[1] === 'm-py-accordion'
                        ? 'block'
                        : 'hidden'
                    }`}
                  >
                    <ul className='pt-2 ps-2 space-y-1.5'>
                      <li className='hs-accordion' id='m-py-obj-accordion'>
                        <button
                          type='button'
                          className={`hs-accordion-toggle ${
                            activeAccordion[2] === 'm-py-obj-accordion'
                              ? 'hs-accordion-active:text-blue-600'
                              : ''
                          } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                          onClick={() =>
                            toggleAccordion([
                              'models-accordion',
                              'm-py-accordion',
                              'm-py-obj-accordion',
                            ])
                          }
                        >
                          Objects
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
                            className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                            <path d='m6 9 6 6 6-6' />
                          </svg>
                        </button>

                        <div
                          id='m-py-obj-accordion'
                          className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                            activeAccordion[2] === 'm-py-obj-accordion'
                              ? 'block'
                              : 'hidden'
                          }`}
                        >
                          <ul className='pt-2 ps-2 space-y-1.5'>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Classification
                              </a>
                            </li>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Detection
                              </a>
                            </li>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Generation
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className='hs-accordion' id='m-py-txt-accordion'>
                        <button
                          type='button'
                          className={`hs-accordion-toggle ${
                            activeAccordion[2] === 'm-py-txt-accordion'
                              ? 'hs-accordion-active:text-blue-600'
                              : ''
                          } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                          onClick={() =>
                            toggleAccordion([
                              'models-accordion',
                              'm-py-accordion',
                              'm-py-txt-accordion',
                            ])
                          }
                        >
                          Text
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
                            className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                            <path d='m6 9 6 6 6-6' />
                          </svg>
                        </button>

                        <div
                          id='m-py-txt-accordion'
                          className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                            activeAccordion[2] === 'm-py-txt-accordion'
                              ? 'block'
                              : 'hidden'
                          }`}
                        >
                          <ul className='pt-2 ps-2 space-y-1.5'>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                LLMs
                              </a>
                            </li>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Text to Speech
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className='hs-accordion' id='m-ag-accordion'>
                  <button
                    type='button'
                    className={`hs-accordion-toggle ${
                      activeAccordion[1] === 'm-ag-accordion'
                        ? 'hs-accordion-active:text-blue-600'
                        : ''
                    } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                    onClick={() =>
                      toggleAccordion(['models-accordion', 'm-ag-accordion'])
                    }
                  >
                    Model Agnostic
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
                      className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                      <path d='m6 9 6 6 6-6' />
                    </svg>
                  </button>

                  <div
                    id='m-ag-accordion'
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                      activeAccordion[1] === 'm-ag-accordion'
                        ? 'block'
                        : 'hidden'
                    }`}
                  >
                    <ul className='pt-2 ps-2 space-y-1.5'>
                      <li className='hs-accordion' id='m-ag-obj-accordion'>
                        <button
                          type='button'
                          className={`hs-accordion-toggle ${
                            activeAccordion[2] === 'm-ag-obj-accordion'
                              ? 'hs-accordion-active:text-blue-600'
                              : ''
                          } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                          onClick={() =>
                            toggleAccordion([
                              'models-accordion',
                              'm-ag-accordion',
                              'm-ag-obj-accordion',
                            ])
                          }
                        >
                          Objects
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
                            className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                            <path d='m6 9 6 6 6-6' />
                          </svg>
                        </button>

                        <div
                          id='m-ag-obj-accordion'
                          className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                            activeAccordion[2] === 'm-ag-obj-accordion'
                              ? 'block'
                              : 'hidden'
                          }`}
                        >
                          <ul className='pt-2 ps-2'>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Classification
                              </a>
                            </li>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Detection
                              </a>
                            </li>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Generation
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className='hs-accordion' id='m-ag-txt-accordion'>
                        <button
                          type='button'
                          className={`hs-accordion-toggle ${
                            activeAccordion[2] === 'm-ag-txt-accordion'
                              ? 'hs-accordion-active:text-blue-600'
                              : ''
                          } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                          onClick={() =>
                            toggleAccordion([
                              'models-accordion',
                              'm-ag-accordion',
                              'm-ag-txt-accordion',
                            ])
                          }
                        >
                          Text
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
                            className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                            <path d='m6 9 6 6 6-6' />
                          </svg>
                        </button>

                        <div
                          id='m-ag-txt-accordion'
                          className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                            activeAccordion[2] === 'm-ag-txt-accordion'
                              ? 'block'
                              : 'hidden'
                          }`}
                        >
                          <ul className='pt-2 ps-2'>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                LLMs
                              </a>
                            </li>
                            <li>
                              <a
                                className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                href='#'
                              >
                                Text to Speech
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li className='hs-accordion' id='libraries-accordion'>
            <button
              type='button'
              className={`hs-accordion-toggle ${
                activeAccordion[0] === 'libraries-accordion'
                  ? 'hs-accordion-active:text-blue-600'
                  : ''
              } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
              onClick={() => toggleAccordion(['libraries-accordion'])}
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
                <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
                <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
              </svg>
              Libraries
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
                className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
              id='libraries-accordion'
              className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                activeAccordion[0] === 'libraries-accordion'
                  ? 'block'
                  : 'hidden'
              }`}
            >
              <ul className='pt-2 ps-2 space-y-1.5'>
                <li>
                  <a
                    className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    href='#'
                  >
                    Python
                  </a>
                </li>
                <li className='hs-accordion' id='lib-react-accordion'>
                  <button
                    type='button'
                    className={`hs-accordion-toggle ${
                      activeAccordion[1] === 'lib-react-accordion'
                        ? 'hs-accordion-active:text-blue-600'
                        : ''
                    } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
                    onClick={() =>
                      toggleAccordion([
                        'libraries-accordion',
                        'lib-react-accordion',
                      ])
                    }
                  >
                    React
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
                      className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
                      <path d='m6 9 6 6 6-6' />
                    </svg>
                  </button>

                  <div
                    id='lib-react-accordion'
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                      activeAccordion[1] === 'lib-react-accordion'
                        ? 'block'
                        : 'hidden'
                    }`}
                  >
                    <ul className='pt-2 ps-2'>
                      <li>
                        <a
                          className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                          href='#'
                        >
                          Javascript
                        </a>
                      </li>
                      <li>
                        <a
                          className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                          href='#'
                        >
                          Typescript
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li className='hs-accordion' id='doc-accordion'>
            <button
              type='button'
              className={`hs-accordion-toggle ${
                activeAccordion[0] === 'doc-accordion'
                  ? 'hs-accordion-active:text-blue-600'
                  : ''
              } w-full text-start flex items-center gap-x-3.5 py-2 px-4 text-sm font-medium text-slate-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring dark:focus:ring-gray-600 rounded`}
              onClick={() => toggleAccordion(['doc-accordion'])}
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
                <path d='M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z' />
                <path d='M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8' />
                <path d='M15 2v5h5' />
              </svg>
              Documentation
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
                className='hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
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
              id='doc-accordion'
              className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                activeAccordion[0] === 'doc-accordion' ? 'block' : 'hidden'
              }`}
            >
              <ul className='pt-2 ps-2 space-y-1.5'>
                <li>
                  <a
                    className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    href='#'
                  >
                    Python
                  </a>
                </li>
                <li>
                  <a
                    className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    href='#'
                  >
                    Javascript / Typescript
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              href='#'
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
            </a>
          </li>
        </ul>
      </nav>
      <div className='mt-auto w-full flex justify-center items-center bg-transparent pt-5 pb-20'>
        <img
          className='h-20 w-30 object-contain'
          src='/logoBlack.png'
          alt='titleText'
        />
      </div>
    </div>
  );
}
