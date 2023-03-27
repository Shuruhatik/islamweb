declare class Fatwa {
    readonly title?: string | undefined;
    link: string;
    fatwa_number: number;
    shortLink: string;
    constructor(id: string, title?: string | undefined);
    getDetails(): Promise<{
        fatwa_number: number | undefined;
        answer: string;
        ask: string;
        link: string;
        created_at: {
            text: string;
            date: string;
            hijri: string;
        };
    }>;
}
declare function search(input: string, timeout?: number): Promise<Fatwa[]>;
export { search, Fatwa };
