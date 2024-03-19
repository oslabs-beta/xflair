export type Upload = {
  id: string;
  name: string;
  size: number;
  image: Buffer;
};

export interface PythonOptions {
  mode: 'text' | 'json' | 'binary';
  pythonOptions: string[];
  args: any[];
}

export interface modelOutput {
    class: string,
    certainty: string,
    folder: string
}

export interface GifCreate {
    format: string,
    resource_type: string,
}