export type Upload = {
  id: string;
  name: string;
  size: number;
  image: Buffer;
};

export interface Top5Obj {
  [key: string]: number;
}
