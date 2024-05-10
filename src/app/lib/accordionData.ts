import { AccordionContent } from "./definitions";


export const modAccordion: AccordionContent = {
    type: 'Accordion',
    label: 'Models',
    key: 'mod-accordion',
    id: ['mod-accordion'],
    icon: 'gear',
    contents: [
      {
        type: 'Accordion',
        label: 'TensorFlow',
        key: 'mod-tf-accordion',
        id: ['mod-accordion', 'mod-tf-accordion'],
        contents: [
          {
            type: 'Accordion',
            label: 'Images',
            key: 'mod-tf-img-accordion',
            id: ['mod-accordion', 'mod-tf-accordion', 'mod-tf-img-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'Classification',
                key: 'tf-img-class-link',
                path: '/models/tensorflow/images/classification',
              },
              {
                type: 'Link',
                label: 'Detection',
                key: 'tf-img-detect-link',
                path: '/models/tensorflow/images/detection',
              },
              {
                type: 'Link',
                label: 'Generation',
                key: 'tf-img-gen-link',
                path: '/models/tensorflow/images/generation',
              },
            ],
          },
          {
            type: 'Accordion',
            label: 'Text',
            key: 'mod-tf-txt-accordion',
            id: ['mod-accordion', 'mod-tf-accordion', 'mod-tf-txt-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'GPTs',
                key: 'tf-txt-gpt-link',
                path: '/models/tensorflow/text/gpt',
              },
              {
                type: 'Link',
                label: 'Detection',
                key: 'tf-txt-tts-link',
                path: '/models/tensorflow/text/texttospeech',
              },
            ],
          },
        ],
      },
      {
        type: 'Accordion',
        label: 'PyTorch',
        key: 'mod-py-accordion',
        id: ['mod-accordion', 'mod-py-accordion'],
        contents: [
          {
            type: 'Accordion',
            label: 'Images',
            key: 'mod-py-img-accordion',
            id: ['mod-accordion', 'mod-py-accordion', 'mod-py-img-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'Classification',
                key: 'py-img-class-link',
                path: '/models/pytorch/images/classification',
              },
              {
                type: 'Link',
                label: 'Detection',
                key: 'py-img-detect-link',
                path: '/models/pytorch/images/detection',
              },
              {
                type: 'Link',
                label: 'Generation',
                key: 'py-img-gen-link',
                path: '/models/pytorch/images/generation',
              },
            ],
          },
          {
            type: 'Accordion',
            label: 'Text',
            key: 'mod-py-txt-accordion',
            id: ['mod-accordion', 'mod-py-accordion', 'mod-py-txt-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'GPTs',
                key: 'py-txt-gpt-link',
                path: '/models/pytorch/text/gpt',
              },
              {
                type: 'Link',
                label: 'Detection',
                key: 'py-txt-tts-link',
                path: '/models/pytorch/text/texttospeech',
              },
            ],
          },
        ],
      },
      {
        type: 'Accordion',
        label: 'Model Agnostic',
        key: 'mod-ag-accordion',
        id: ['mod-accordion', 'mod-ag-accordion'],
        contents: [
          {
            type: 'Accordion',
            label: 'Images',
            key: 'mod-ag-img-accordion',
            id: ['mod-accordion', 'mod-ag-accordion', 'mod-ag-img-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'Classification',
                key: 'ag-img-class-link',
                path: '/models/agnostic/images/classification',
              },
              {
                type: 'Link',
                label: 'Detection',
                key: 'ag-img-detect-link',
                path: '/models/agnostic/images/detection',
              },
              {
                type: 'Link',
                label: 'Generation',
                key: 'ag-img-gen-link',
                path: '/models/agnostic/images/generation',
              },
            ],
          },
          {
            type: 'Accordion',
            label: 'Text',
            key: 'mod-ag-txt-accordion',
            id: ['mod-accordion', 'mod-ag-accordion', 'mod-ag-txt-accordion'],
            contents: [
              {
                type: 'Link',
                label: 'GPTs',
                key: 'ag-txt-gpt-link',
                path: '/models/agnostic/text/gpt',
              },
              {
                type: 'Link',
                label: 'Detection',
                key: 'ag-txt-tts-link',
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
    key: 'lib-accordion',
    id: ['lib-accordion'],
    icon: 'book',
    contents: [
      {
        type: 'Link',
        label: 'Python',
        key: 'lib-py-link',
        path: '/libraries/python',
      },
      {
        type: 'Accordion',
        label: 'React',
        key: 'lib-react-accordion',
        id: ['lib-accordion', 'lib-react-accordion'],
        contents: [
          {
            type: 'Link',
            label: 'Javascript',
            key: 'lib-react-js-link',
            path: '/libraries/react/javascript',
          },
          {
            type: 'Link',
            label: 'Typescript',
            key: 'lib-react-ts-link',
            path: '/libraries/react/typescript',
          },
        ],
      },
    ],
  };
  
  export const docAccordion: AccordionContent = {
    type: 'Accordion',
    label: 'Documentation',
    key: 'doc-accordion',
    id: ['doc-accordion'],
    icon: 'pages',
    contents: [
      {
        type: 'Link',
        label: 'Python',
        key: 'doc-py-link',
        path: '/documentation/python',
      },
      {
        type: 'Link',
        label: 'Javascript / Typescript',
        key: 'doc-jsts-link',
        path: '/documentation/javascript-typescript',
      },
    ],
  };