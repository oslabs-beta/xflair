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