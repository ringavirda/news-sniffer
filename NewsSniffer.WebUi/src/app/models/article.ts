export interface Article {
    id: number;
    // header
    outletCode: string;
    date: Date;
    // main
    title: string;
    articleHref: string;
    body: string;
    // analysis
    marker: string;
    impression: string;
}