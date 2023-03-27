"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fatwa = exports.search = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const jsdom_1 = require("jsdom");
class Fatwa {
    constructor(id, title) {
        this.title = title;
        this.link = "https://www.islamweb.net" + id;
        this.fatwa_number = +id.split("/")[3];
        this.shortLink = "https://www.islamweb.net/ar/fatwa/" + this.fatwa_number;
    }
    async getDetails() {
        const browser = await puppeteer_1.default.launch();
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
        const dateStr = content.match(/تاريخ النشر:(.*)/) ? content.match(/تاريخ النشر:(.*)/)[1].trim() : undefined;
        const fatwa_number = content.match(/رقم الفتوى:(.*)/) ? Number(content.match(/رقم الفتوى:(.*)/)[1].trim()) : undefined;
        const dateSplit = dateStr.split(" - ");
        return { link: this.link, fatwa_number, answer, ask, created_at: { text: dateStr, date: dateSplit[1].replace("م", "").replaceAll("-", "/").trim(), hijri: dateSplit[0] } };
    }
}
exports.Fatwa = Fatwa;
async function search(input, timeout = 1500) {
    const browser = await puppeteer_1.default.launch();
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
            links.push(new Fatwa(elements[i].href, elements[i].textContent.trim()));
        }
    }
    await browser.close();
    return links;
}
exports.search = search;
//# sourceMappingURL=index.js.map