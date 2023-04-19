import { PuppeteerLaunchOptions } from 'puppeteer';
declare class IslamWebFatwa {
    readonly title?: string | undefined;
    link: string;
    fatwa_number: number;
    shortLink: string;
    constructor(url: string, title?: string | undefined);
    getDetails(puppeteerLaunchOptions?: PuppeteerLaunchOptions, timeout?: number): Promise<{
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
            hijri?: string;
        };
    }>;
}
declare function islamweb_search(input: string, puppeteerLaunchOptions?: PuppeteerLaunchOptions): Promise<IslamWebFatwa[]>;
export { IslamWebFatwa, islamweb_search };
