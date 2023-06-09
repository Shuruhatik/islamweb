declare class IslamWebFatwa {
    readonly title?: string | undefined;
    link: string;
    fatwa_number: number;
    shortLink: string;
    constructor(url: string, title?: string | undefined);
    getDetails(): Promise<{
        fatwa_number: number | undefined;
        answer: string;
        ask: string;
        title?: string;
        description?: string | null;
        author?: string | null;
        related_fatwas?: IslamWebFatwa[];
        link: string;
        created_at: {
            text: string;
            year?: number;
            day?: number;
            month?: number;
            iso?: Date;
            hijri?: string;
        };
    }>;
}
declare function islamweb_search(input: string, page: number): Promise<IslamWebFatwa[]>;
export { IslamWebFatwa, islamweb_search };
