export type Ngram = [{ 'frequency': number, terms: string[] }];

export interface Article {
    id: number;
    // header
    outletCode: string;
    date: Date;
    // main
    title: string;
    articleHref: string;
    body: string;
    ngram: Ngram
    // analysis
    marker: string;
    impression: string;
    prediction: string;
}