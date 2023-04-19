import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer';
import { JSDOM } from 'jsdom';
import { islamqa_search, IslamQaFatwa } from "./islamqa.js";
import { IslamWebFatwa, islamweb_search } from "./islamweb.js";

interface SearchOptions {
  website: "islamqa.info" | "islamweb.net" | "islamweb" | "islamqa";
  lang?: "ar" | "fr" | "en" | "tr" | "fa" | "id" | "ur" | "ug" | "ge" | "bn" | "ru" | "es" | "hi" | "pt" | "tg";
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
}
interface FatwaDetails {
  link?: string;
  fatwa_number?: string | number;
  lang?: "ar" | "fr" | "en" | "tr" | "fa" | "id" | "ur" | "ug" | "ge" | "bn" | "ru" | "es" | "hi" | "pt" | "tg";
  website: "islamqa.info" | "islamweb.net" | "islamweb" | "islamqa";
  puppeteerLaunchOptions?: PuppeteerLaunchOptions;
}

const formatErrorMessage = (reason: string, method_name: string, type: string = "function", var1?: string, var2?: string): string => {
  console.log(`\x1b[36m`)
  return `\u001b[38;5;251m> \u001b[38;5;2mIslamWeb Package\n    \u001b[38;5;160m${reason}\n\n    \u001b[38;5;160mClass:\n    \u001b[38;5;243m|  \u001b[38;5;34m'${method_name}' ${var1 ? `\x1b[4m\u001b[38;5;243m->\x1b[0m \u001b[38;5;243m\u001b[38;5;34m'${var1}'\u001b[38;5;243m` : ``}${var2 ? `\u001b[38;5;243m\x1b[4m->\x1b[0m \u001b[38;5;34m'${var2}'` : ""}\x1b[0m`
}

async function getDetails(options: FatwaDetails): Promise<{
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
}> {
  if (!options.website) throw Error(formatErrorMessage("You must choose a search method through islamweb.net or islamqa.info", "search", "function", "options", "website"))
  if (options.website.includes("islamweb")) {
    if (options.link && !options.fatwa_number) options.fatwa_number = +options.link.split("/")[5];
    const fatwa = new IslamWebFatwa(`${options.fatwa_number}`)
    return await fatwa.getDetails(options.puppeteerLaunchOptions || {})
  } else if (options.website.includes("islamq")) {
    if (options.link && !options.fatwa_number) options.fatwa_number = +options.link.split("/")[5];
    const fatwa = new IslamQaFatwa(`${options.fatwa_number}`, undefined, options.lang || "ar")
    return await fatwa.getDetails(options.puppeteerLaunchOptions || {})
  } else throw Error(formatErrorMessage("You must choose a search method through islamweb.net or islamqa.info", "search", "function", "options", "website"))

}

async function search(input: string, options: SearchOptions): Promise<IslamQaFatwa[] | IslamWebFatwa[]> {
  if (!options.website) throw Error(formatErrorMessage("You must choose a search method through islamweb.net or islamqa.info", "search", "function", "options", "website"))
  if (options.website.includes("islamweb")) {
    return await islamweb_search(input, options.puppeteerLaunchOptions || {})
  } else if (options.website.includes("islamq")) {
    if (!options.lang) options.lang = "ar";
    if (!["ar", "fr", "en", "tr", "fa", "id", "ur", "ug", "ge", "bn", "ru", "es", "hi", "pt", "tg"].some(l => l == options.lang)) throw Error(formatErrorMessage('You must choose a language from among these available languages, which is "ar" | "fr" | "en" | "tr" | "fa" | "id" | "ur" | "ug" | "ge" | "bn" | "ru" | "es" | "hi" | "pt" | "tg"', "search", "function", "options", "lang"))
    return await islamqa_search(input, options.lang, options.puppeteerLaunchOptions || {})
  } else throw Error(formatErrorMessage("You must choose a search method through islamweb.net or islamqa.info", "search", "function", "options", "website"))
}

export { getDetails, search }