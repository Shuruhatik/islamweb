import { parseHTML } from 'linkedom';
import axios from "axios";

class IslamQaFatwa {
  link: string;
  fatwa_number: number;
  shortLink: string;
  constructor(url: string, readonly title?: string, lang?: string, readonly question?: string) {
    this.link = /^-?\d+$/.test(url) ? `https://islamqa.info/${lang || "ar"}/answers/${url}` : url.split("/")[5] ? url : `https://islamqa.info/${lang || "ar"}/answers/${url}`;
    this.fatwa_number = this.link.split("/")[5] ? +this.link.split("/")[5] : 0;
    this.shortLink = `https://islamqa.info/${lang || "ar"}/answers/${this.fatwa_number}`;
  }
  async getDetails(): Promise<{
    fatwa_number: number | undefined;
    answer: string;
    title?: string;
    ask: string;
    link: string;
    created_at: {
      text: string;
      year?: number;
      day?: number;
      month?: number;
      iso?: Date;
    };
  }> {
    const response = await axios.request({
      url: this.link,
      method: "GET"
    });
    const sanitizedHtml = response.data.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    const dom: any = parseHTML(sanitizedHtml);
    const map: Map<any, any> = new Map()
    const elements = dom.window.document.querySelectorAll('*')
    for (let i = 0; i < elements.length; i++) {
      const element: any = elements[i];
      if (!map.has(element.tagName)) map.set(element.tagName, []);
      map.get(element.tagName).push(element.textContent.trim());
    }
    const sections = map.has("SECTION") ? map.get("SECTION") : map.get("DIV");
    const created_at_text = map.get("BODY")[0].match(/Publication :(.*)/) ? map.get("BODY")[0].match(/Publication :(.*)/)[1].trim() : map.get("BODY")[0].match(/تاريخ النشر :(.*)/) ? map.get("BODY")[0].match(/تاريخ النشر :(.*)/)[1].trim() : map.get("BODY")[0].match(/Таърихи нашр :(.*)/) ? map.get("BODY")[0].match(/Таърихи нашр :(.*)/)[1].trim() : map.get("BODY")[0].match(/تارقاتقان ۋاقىت :(.*)/) ? map.get("BODY")[0].match(/تارقاتقان ۋاقىت :(.*)/)[1].trim() : map.get("BODY")[0].match(/Data de publicação :(.*)/) ? map.get("BODY")[0].match(/Data de publicação :(.*)/)[1].trim() : map.get("BODY")[0].match(/Herausgabedatum :(.*)/) ? map.get("BODY")[0].match(/Herausgabedatum :(.*)/)[1].trim() : map.get("BODY")[0].match(/प्रकाशन की तिथि :(.*)/) ? map.get("BODY")[0].match(/प्रकाशन की तिथि :(.*)/)[1].trim() : map.get("BODY")[0].match(/تاریخ نشر :(.*)/) ? map.get("BODY")[0].match(/تاریخ نشر :(.*)/)[1].trim() : map.get("BODY")[0].match(/প্রকাশকাল :(.*)/) ? map.get("BODY")[0].match(/প্রকাশকাল :(.*)/)[1].trim() : map.get("BODY")[0].match(/Fecha de publicación :(.*)/) ? map.get("BODY")[0].match(/Fecha de publicación :(.*)/)[1].trim() : map.get("BODY")[0].match(/Дата публикации :(.*)/) ? map.get("BODY")[0].match(/Дата публикации :(.*)/)[1].trim() : map.get("BODY")[0].match(/প্রকাশকাল :(.*)/) ? map.get("BODY")[0].match(/প্রকাশকাল :(.*)/)[1].trim() : map.get("BODY")[0].match(/تاریخ اشاعت :(.*)/) ? map.get("BODY")[0].match(/تاریخ اشاعت :(.*)/)[1].trim() : map.get("BODY")[0].match(/Yayınlama tarihi :(.*)/) ? map.get("BODY")[0].match(/Yayınlama tarihi :(.*)/)[1].trim() : map.get("BODY")[0].match(/Tanggal Tayang :(.*)/) ? map.get("BODY")[0].match(/Tanggal Tayang :(.*)/)[1].trim() : map.get("BODY")[0].match(/Date de publication :(.*)/) ? map.get("BODY")[0].match(/Date de publication :(.*)/)[1].trim() : undefined;
    if (!created_at_text || created_at_text && !created_at_text.split('-')) throw Error("There is no fatwa on this number")
    const title: string = map.has("H1") && map.get("H1")[0] ? map.get("H1")[0].trim() : undefined
    const fatwa_number = this.link.split("/answers/")[1] ? Number(this.link.split("/answers/")[1].split("/")[0]) : undefined;
    const [day, month, year] = created_at_text.split('-').map(Number);

    return {
      title, link: this.link, fatwa_number, ask: sections[0].trim().split("\n")[2].trim(), answer: sections[2].trim(), created_at: {
        text: created_at_text, day, month, year, iso: new Date(year, month - 1, day)
      }
    };
  }
}

async function islamqa_search(input: string, lang: string, page: number): Promise<IslamQaFatwa[]> {
  const response = await axios.get("https://islamqa.info/api/search?page=" + page + "&q=" + encodeURI(input.trim()) + "&filters[]=title&filters[]=question&filters[]=answer&filters[]=description&filters[]=source&filters[]=reference&type=fatawa&operator=OR")
  if (!response.data || response.data && response.data.Search && !response.data.Search.results) return [];
  return response.data.Search.results.map((fatwa: any) => new IslamQaFatwa(fatwa.reference, fatwa.title.replace(/<[^>]*>/g, ''), lang, fatwa.question.replace(/<[^>]*>/g, '')))
}


export { IslamQaFatwa, islamqa_search }