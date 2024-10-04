export type Tour = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    departure: string;
    returnTime: string;
    included: string[];
    notIncluded: string[];
}