import { AccordionContent } from "./definitions";


export const modAccordion: AccordionContent = {
    type: 'Accordion',
    label: 'Models',
    id: ['mod-accordion'],
    icon: 'gear',
    contents: [
      {
        type: 'Accordion',
        label: 'TensorFlow',
        id: ['mod-accordion', 'mod-tf-accordion'],
        contents: [
          {
            type: 'Accordion',
            label: 'Images',
            id: ['mod-accordion', 'mod-tf-accordion', 'mod-tf-img-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'Classification',
                path: '/models/tensorflow/images/classification',
              },
              {
                type: 'Link',
                label: 'Detection',
                path: '/models/tensorflow/images/detection',
              },
              {
                type: 'Link',
                label: 'Generation',
                path: '/models/tensorflow/images/generation',
              },
            ],
          },
          {
            type: 'Accordion',
            label: 'Text',
            id: ['mod-accordion', 'mod-tf-accordion', 'mod-tf-txt-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'GPTs',
                path: '/models/tensorflow/text/gpt',
              },
              {
                type: 'Link',
                label: 'Detection',
                path: '/models/tensorflow/text/texttospeech',
              },
            ],
          },
        ],
      },
      {
        type: 'Accordion',
        label: 'PyTorch',
        id: ['mod-accordion', 'mod-py-accordion'],
        contents: [
          {
            type: 'Accordion',
            label: 'Images',
            id: ['mod-accordion', 'mod-py-accordion', 'mod-py-img-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'Classification',
                path: '/models/pytorch/images/classification',
              },
              {
                type: 'Link',
                label: 'Detection',
                path: '/models/pytorch/images/detection',
              },
              {
                type: 'Link',
                label: 'Generation',
                path: '/models/pytorch/images/generation',
              },
            ],
          },
          {
            type: 'Accordion',
            label: 'Text',
            id: ['mod-accordion', 'mod-py-accordion', 'mod-py-txt-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'GPTs',
                path: '/models/pytorch/text/gpt',
              },
              {
                type: 'Link',
                label: 'Detection',
                path: '/models/pytorch/text/texttospeech',
              },
            ],
          },
        ],
      },
      {
        type: 'Accordion',
        label: 'Model Agnostic',
        id: ['mod-accordion', 'mod-ag-accordion'],
        contents: [
          {
            type: 'Accordion',
            label: 'Images',
            id: ['mod-accordion', 'mod-ag-accordion', 'mod-ag-img-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'Classification',
                path: '/models/agnostic/images/classification',
              },
              {
                type: 'Link',
                label: 'Detection',
                path: '/models/agnostic/images/detection',
              },
              {
                type: 'Link',
                label: 'Generation',
                path: '/models/agnostic/images/generation',
              },
            ],
          },
          {
            type: 'Accordion',
            label: 'Text',
            id: ['mod-accordion', 'mod-ag-accordion', 'mod-ag-txt-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'GPTs',
                path: '/models/agnostic/text/gpt',
              },
              {
                type: 'Link',
                label: 'Detection',
                path: '/models/agnostic/text/texttospeech',
              },
            ],
          },
        ],
      },
    ],
  };
  
  export const libAccordion: AccordionContent = {
    type: 'Accordion',
    label: 'Libraries',
    id: ['lib-accordion'],
    icon: 'book',
    contents: [
      {
        type: 'Link',
        label: 'Python',
        path: '/libraries/python',
      },
      {
        type: 'Accordion',
        label: 'React',
        id: ['lib-accordion', 'lib-react-accordion'],
        contents: [
          {
            type: 'Link',
            label: 'Javascript',
            path: '/libraries/react/javascript',
          },
          {
            type: 'Link',
            label: 'Typescript',
            path: '/libraries/react/typescript',
          },
        ],
      },
    ],
  };
  
  export const docAccordion: AccordionContent = {
    type: 'Accordion',
    label: 'Documentation',
    id: ['doc-accordion'],
    icon: 'pages',
    contents: [
      {
        type: 'Link',
        label: 'Python',
        path: '/documentation/python',
      },
      {
        type: 'Link',
        label: 'Javascript / Typescript',
        path: '/documentation/javascript-typescript',
      },
    ],
  };