import { PuppeteerLaunchOptions } from 'puppeteer';
declare class IslamQaFatwa {
    readonly title?: string | undefined;
    link: string;
    fatwa_number: number;
    shortLink: string;
    constructor(url: string, title?: string | undefined, lang?: string);
    getDetails(puppeteerLaunchOptions?: any): Promise<{
        fatwa_number: number | undefined;
        answer: string;
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
declare function islamqa_search(input: string, lang: string, puppeteerLaunchOptions?: PuppeteerLaunchOptions): Promise<IslamQaFatwa[]>;
export { IslamQaFatwa, islamqa_search };
