"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.islamweb_search = exports.IslamWebFatwa = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const jsdom_1 = require("jsdom");
class IslamWebFatwa {
    constructor(url, title) {
        this.title = title;
        this.link = url.split("/")[5] ? url : "https://www.islamweb.net/ar/fatwa/" + url;
        this.fatwa_number = this.link.split("/")[5] ? +this.link.split("/")[5] : 0;
        this.shortLink = "https://www.islamweb.net/ar/fatwa/" + this.fatwa_number;
    }
    async getDetails(puppeteerLaunchOptions) {
        const browser = await puppeteer_1.default.launch({
            args: ["--no-sandbox", "--disabled-setupid-sandbox"], ...puppeteerLaunchOptions
        });
        const page = await browser.newPage();
        await page.goto(this.link);
        const bodyHandle = await page.$('body');
        const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
        const sanitizedHtml = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        const dom = new jsdom_1.JSDOM(sanitizedHtml);
        const map = new Map();
        const elements = dom.window.document.getElementsByTagName('*');
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (!map.has(element.tagName))
                map.set(element.tagName, []);
            map.get(element.tagName).push(element.textContent.trim());
        }
        const content = map.has("BODY") ? map.get("BODY")[0].replaceAll("\t", "") : map.get("DIV")[0].replaceAll("\t", "");
        const askTitle = "السؤال";
        const askEndIndex = content.indexOf('\n\n', content.indexOf(askTitle) + askTitle.length);
        const answerTitle = 'الإجابــة';
        const answerEndIndex = content.indexOf('\n\n', content.indexOf(answerTitle) + answerTitle.length);
        const ask = content.substring(askEndIndex, content.length).trim().split("\n\n\n\n")[0].trim();
        const answer = content.substring(answerEndIndex, content.length).trim().split("\n\n\n\n")[0].trim();
        const arabicDate = content.match(/تاريخ النشر:(.*)/) ? content.match(/تاريخ النشر:(.*)/)[1].trim() : undefined;
        const fatwa_number = content.match(/رقم الفتوى:(.*)/) ? Number(content.match(/رقم الفتوى:(.*)/)[1].trim()) : undefined;
        if (content.includes("لا يوجد فتوى بهذا الرقم"))
            throw Error("There is no fatwa on this number");
        const dateSplit = arabicDate && arabicDate.split(" - ")[0] ? arabicDate.split(" - ") : undefined;
        const gregorianDateMatch = dateSplit ? arabicDate.match(/(\d{1,2})-(\d{1,2})-(\d{4})/) : undefined;
        return {
            link: this.link, fatwa_number, ask, answer, created_at: {
                text: gregorianDateMatch && gregorianDateMatch[0] ? gregorianDateMatch[0] : arabicDate, hijri: arabicDate,
                day: gregorianDateMatch && gregorianDateMatch[1] ? +gregorianDateMatch[1] : undefined, month: gregorianDateMatch && gregorianDateMatch[2] ? +gregorianDateMatch[2] : undefined, year: gregorianDateMatch && gregorianDateMatch[3] ? +gregorianDateMatch[3] : undefined, iso: gregorianDateMatch && gregorianDateMatch[0] ? new Date(+gregorianDateMatch[3], +gregorianDateMatch[2] - 1, +gregorianDateMatch[1]) : undefined
            }
        };
    }
}
exports.IslamWebFatwa = IslamWebFatwa;
async function islamweb_search(input, timeout = 3500, puppeteerLaunchOptions) {
    const browser = await puppeteer_1.default.launch({
        args: ["--no-sandbox", "--disabled-setupid-sandbox"], ...puppeteerLaunchOptions
    });
    const page = await browser.newPage();
    await page.goto('https://www.islamweb.net/ar/articles/index.php?page=websearch&stxt=' + encodeURI(input.trim()));
    await page.waitForTimeout(timeout);
    const bodyHandle = await page.$('body');
    const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
    const sanitizedHtml = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    const dom = new jsdom_1.JSDOM(sanitizedHtml);
    const links = [];
    const elements = dom.window.document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent && elements[i].href && elements[i].href !== "/ar/fatwa/" && elements[i].href.startsWith("/ar/fatwa/") && elements[i].tagName == "A") {
            links.push(new IslamWebFatwa(elements[i].href, elements[i].textContent.trim()));
        }
    }
    await browser.close();
    return links;
}
exports.islamweb_search = islamweb_search;
//# sourceMappingURL=islamweb.js.map