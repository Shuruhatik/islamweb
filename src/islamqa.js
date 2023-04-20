"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.islamqa_search = exports.IslamQaFatwa = void 0;
const linkedom_1 = require("linkedom");
const axios_1 = __importDefault(require("axios"));
class IslamQaFatwa {
    constructor(url, title, lang, question) {
        this.title = title;
        this.question = question;
        this.link = /^-?\d+$/.test(url) ? `https://islamqa.info/${lang || "ar"}/answers/${url}` : url.split("/")[5] ? url : `https://islamqa.info/${lang || "ar"}/answers/${url}`;
        this.fatwa_number = this.link.split("/")[5] ? +this.link.split("/")[5] : 0;
        this.shortLink = `https://islamqa.info/${lang || "ar"}/answers/${this.fatwa_number}`;
    }
    async getDetails() {
        const response = await axios_1.default.request({
            url: this.link,
            method: "GET"
        });
        const sanitizedHtml = response.data.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        const dom = (0, linkedom_1.parseHTML)(sanitizedHtml);
        const map = new Map();
        const elements = dom.window.document.querySelectorAll('*');
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (!map.has(element.tagName))
                map.set(element.tagName, []);
            map.get(element.tagName).push(element.textContent.trim());
        }
        const sections = map.has("SECTION") ? map.get("SECTION") : map.get("DIV");
        const created_at_text = map.get("BODY")[0].match(/Publication :(.*)/) ? map.get("BODY")[0].match(/Publication :(.*)/)[1].trim() : map.get("BODY")[0].match(/تاريخ النشر :(.*)/) ? map.get("BODY")[0].match(/تاريخ النشر :(.*)/)[1].trim() : map.get("BODY")[0].match(/Таърихи нашр :(.*)/) ? map.get("BODY")[0].match(/Таърихи нашр :(.*)/)[1].trim() : map.get("BODY")[0].match(/تارقاتقان ۋاقىت :(.*)/) ? map.get("BODY")[0].match(/تارقاتقان ۋاقىت :(.*)/)[1].trim() : map.get("BODY")[0].match(/Data de publicação :(.*)/) ? map.get("BODY")[0].match(/Data de publicação :(.*)/)[1].trim() : map.get("BODY")[0].match(/Herausgabedatum :(.*)/) ? map.get("BODY")[0].match(/Herausgabedatum :(.*)/)[1].trim() : map.get("BODY")[0].match(/प्रकाशन की तिथि :(.*)/) ? map.get("BODY")[0].match(/प्रकाशन की तिथि :(.*)/)[1].trim() : map.get("BODY")[0].match(/تاریخ نشر :(.*)/) ? map.get("BODY")[0].match(/تاریخ نشر :(.*)/)[1].trim() : map.get("BODY")[0].match(/প্রকাশকাল :(.*)/) ? map.get("BODY")[0].match(/প্রকাশকাল :(.*)/)[1].trim() : map.get("BODY")[0].match(/Fecha de publicación :(.*)/) ? map.get("BODY")[0].match(/Fecha de publicación :(.*)/)[1].trim() : map.get("BODY")[0].match(/Дата публикации :(.*)/) ? map.get("BODY")[0].match(/Дата публикации :(.*)/)[1].trim() : map.get("BODY")[0].match(/প্রকাশকাল :(.*)/) ? map.get("BODY")[0].match(/প্রকাশকাল :(.*)/)[1].trim() : map.get("BODY")[0].match(/تاریخ اشاعت :(.*)/) ? map.get("BODY")[0].match(/تاریخ اشاعت :(.*)/)[1].trim() : map.get("BODY")[0].match(/Yayınlama tarihi :(.*)/) ? map.get("BODY")[0].match(/Yayınlama tarihi :(.*)/)[1].trim() : map.get("BODY")[0].match(/Tanggal Tayang :(.*)/) ? map.get("BODY")[0].match(/Tanggal Tayang :(.*)/)[1].trim() : map.get("BODY")[0].match(/Date de publication :(.*)/) ? map.get("BODY")[0].match(/Date de publication :(.*)/)[1].trim() : undefined;
        if (!created_at_text || created_at_text && !created_at_text.split('-'))
            throw Error("There is no fatwa on this number");
        const title = map.has("H1") && map.get("H1")[0] ? map.get("H1")[0].trim() : undefined;
        const fatwa_number = this.link.split("/answers/")[1] ? Number(this.link.split("/answers/")[1].split("/")[0]) : undefined;
        const [day, month, year] = created_at_text.split('-').map(Number);
        return {
            title, link: this.link, fatwa_number, ask: sections[0].trim().split("\n")[2].trim(), answer: sections[2].trim(), created_at: {
                text: created_at_text, day, month, year, iso: new Date(year, month - 1, day)
            }
        };
    }
}
exports.IslamQaFatwa = IslamQaFatwa;
async function islamqa_search(input, lang, page) {
    const response = await axios_1.default.get("https://islamqa.info/api/search?page=" + page + "&q=" + encodeURI(input.trim()) + "&filters[]=title&filters[]=question&filters[]=answer&filters[]=description&filters[]=source&filters[]=reference&type=fatawa&operator=OR");
    if (!response.data || response.data && response.data.Search && !response.data.Search.results)
        return [];
    return response.data.Search.results.map((fatwa) => new IslamQaFatwa(fatwa.reference, fatwa.title.replace(/<[^>]*>/g, ''), lang, fatwa.question.replace(/<[^>]*>/g, '')));
}
exports.islamqa_search = islamqa_search;
//# sourceMappingURL=islamqa.js.map