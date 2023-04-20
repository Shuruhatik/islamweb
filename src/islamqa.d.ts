declare class IslamQaFatwa {
    readonly title?: string | undefined;
    readonly question?: string | undefined;
    link: string;
    fatwa_number: number;
    shortLink: string;
    constructor(url: string, title?: string | undefined, lang?: string, question?: string | undefined);
    getDetails(): Promise<{
        fatwa_number: number | undefined;
        answer: string;
        title?: string;
        ask: string;
        link: string;
        created_at: {
            text: string;
            year?: number;
            day?: number;
            month?: number;
            iso?: Date;
        };
    }>;
}
declare function islamqa_search(input: string, lang: string, page: number): Promise<IslamQaFatwa[]>;
export { IslamQaFatwa, islamqa_search };
