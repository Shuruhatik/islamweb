"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.islamweb_search = exports.IslamWebFatwa = void 0;
const linkedom_1 = require("linkedom");
const axios_1 = __importDefault(require("axios"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
class IslamWebFatwa {
    constructor(url, title) {
        this.title = title;
        this.link = /^-?\d+$/.test(url) ? "https://www.islamweb.net/ar/fatwa/" + url : url.split("/")[5] ? url : "https://www.islamweb.net" + url;
        this.fatwa_number = this.link.split("/")[5] ? +this.link.split("/")[5] : 0;
        this.shortLink = "https://www.islamweb.net/ar/fatwa/" + this.fatwa_number;
    }
    async getDetails() {
        const response = await axios_1.default.request({
            url: this.link,
            method: "GET"
        });
        const sanitizedHtml = response.data.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        const dom = (0, linkedom_1.parseHTML)(sanitizedHtml);
        const map = new Map();
        const related_fatwas = [];
        const elements = dom.window.document.querySelectorAll('*');
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (!map.has(element.tagName))
                map.set(element.tagName, []);
            map.get(element.tagName).push(element.textContent.trim());
            if (element.textContent && element.href && element.href !== "/ar/fatwa/" && element.href.startsWith("/ar/fatwa/") && element.tagName == "A" && element.href.split("/")[3] && /^-?\d+$/.test(element.href.split("/")[3])) {
                related_fatwas.push(new IslamWebFatwa(element.href, element.textContent.trim()));
            }
        }
        const content = map.has("BODY") ? map.get("BODY")[0].replaceAll("\t", "") : map.get("DIV")[0].replaceAll("\t", "");
        const ask = map.get("P")[0].trim();
        const answer = map.get("P").slice(2, -3).join("\n").trim();
        const arabicDate = content.match(/تاريخ النشر:(.*)/) ? content.match(/تاريخ النشر:(.*)/)[1].trim() : undefined;
        const fatwa_number = content.match(/رقم الفتوى:(.*)/) ? Number(content.match(/رقم الفتوى:(.*)/)[1].trim()) : undefined;
        if (content.includes("لا يوجد فتوى بهذا الرقم"))
            throw Error("There is no fatwa on this number");
        const title = map.has("H1") && map.get("H1")[2] ? map.get("H1")[2].trim() : undefined;
        const description = dom.window.document.querySelector('meta[name="description"]')?.getAttribute("content");
        const author = dom.window.document.querySelector('meta[itemprop="author"]')?.getAttribute("content");
        const dateSplit = arabicDate && arabicDate.split(" - ")[0] ? arabicDate.split(" - ") : undefined;
        const gregorianDateMatch = dateSplit ? arabicDate.match(/(\d{1,2})-(\d{1,2})-(\d{4})/) : undefined;
        return {
            title, author, description, link: this.link, fatwa_number, ask, answer, created_at: {
                text: gregorianDateMatch && gregorianDateMatch[0] ? gregorianDateMatch[0] : arabicDate, hijri: arabicDate,
                day: gregorianDateMatch && gregorianDateMatch[1] ? +gregorianDateMatch[1] : undefined, month: gregorianDateMatch && gregorianDateMatch[2] ? +gregorianDateMatch[2] : undefined, year: gregorianDateMatch && gregorianDateMatch[3] ? +gregorianDateMatch[3] : undefined, iso: gregorianDateMatch && gregorianDateMatch[0] ? new Date(+gregorianDateMatch[3], +gregorianDateMatch[2] - 1, +gregorianDateMatch[1]) : undefined
            }, related_fatwas
        };
    }
}
exports.IslamWebFatwa = IslamWebFatwa;
async function islamweb_search(input, page) {
    const response = await axios_1.default.get('https://search.islamweb.net/ver3/ar/SearchEngine/fattab.php?start=' + (page - 1) * 35 + '&R1=0&wheretosearch=0&txt=' + encodeURI(input.trim()), {
        responseType: 'arraybuffer'
    });
    const sanitizedHtml = iconv_lite_1.default.decode(Buffer.from(response.data), 'windows-1256').replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    const dom = (0, linkedom_1.parseHTML)(sanitizedHtml);
    const links = [];
    const elements = dom.window.document.querySelectorAll('*');
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent && elements[i].href && elements[i].href !== "/ar/fatwa/" && elements[i].href.startsWith("/ar/fatwa/") && elements[i].tagName == "A") {
            links.push(new IslamWebFatwa(elements[i].href, elements[i].textContent.trim()));
        }
    }
    return links;
}
exports.islamweb_search = islamweb_search;
//# sourceMappingURL=islamweb.js.map