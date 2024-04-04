export type Upload = {
  id: string;
  name: string;
  size: number;
  image: Buffer;
};

export type Heatmaps = {
    heatmaps: string[] | null
    progressbars: string[] | null
}

export type Featuremaps = {
    featuremaps: string[] | null
    progressbars: string[] | null
}

export interface Top5Obj {
  [key: string]: number;
}

export interface AccordionContent {
  type: 'Link' | 'Accordion';
  label: string;
  path?: string;
  id?: string[];
  icon?: 'gear' | 'book' | 'pages';
  contents?: AccordionContent[];
}
