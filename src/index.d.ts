import { PuppeteerLaunchOptions } from 'puppeteer';
import { IslamQaFatwa } from "./islamqa.js";
import { IslamWebFatwa } from "./islamweb.js";
interface SearchOptions {
    website: "islamqa.info" | "islamweb.net" | "islamweb" | "islamqa";
    timeout?: number;
    lang?: "ar" | "fr" | "en" | "tr" | "fa" | "id" | "ur" | "ug" | "ge" | "bn" | "ru" | "es" | "hi" | "pt" | "tg";
    puppeteerLaunchOptions?: PuppeteerLaunchOptions;
}
interface FatwaDetails {
    link?: string;
    fatwa_number?: string | number;
    lang?: "ar" | "fr" | "en" | "tr" | "fa" | "id" | "ur" | "ug" | "ge" | "bn" | "ru" | "es" | "hi" | "pt" | "tg";
    website: "islamqa.info" | "islamweb.net" | "islamweb" | "islamqa";
    puppeteerLaunchOptions?: PuppeteerLaunchOptions;
}
declare function getDetails(options: FatwaDetails): Promise<{
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
declare function search(input: string, options: SearchOptions): Promise<IslamQaFatwa[] | IslamWebFatwa[]>;
export { getDetails, search };
