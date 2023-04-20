import { parseHTML } from 'linkedom';
import axios from "axios";
import iconv from 'iconv-lite';

class IslamWebFatwa {
  link: string;
  fatwa_number: number;
  shortLink: string;
  constructor(url: string, readonly title?: string) {
    this.link = /^-?\d+$/.test(url) ? "https://www.islamweb.net/ar/fatwa/" + url : url.split("/")[5] ? url : "https://www.islamweb.net" + url;
    this.fatwa_number = this.link.split("/")[5] ? +this.link.split("/")[5] : 0;
    this.shortLink = "https://www.islamweb.net/ar/fatwa/" + this.fatwa_number;
  }
  async getDetails(): Promise<{
    fatwa_number: number | undefined;
    answer: string;
    ask: string;
    title?: string;
    description?: string | null;
    author?: string | null;
    related_fatwas?: IslamWebFatwa[]
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
    const response = await axios.request({
      url: this.link,
      method: "GET"
    });
    const sanitizedHtml = response.data.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    const dom = parseHTML(sanitizedHtml);
    const map: Map<any, any> = new Map()
    const related_fatwas: any[] = []
    const elements = dom.window.document.querySelectorAll('*');
    for (let i = 0; i < elements.length; i++) {
      const element: any = elements[i];
      if (!map.has(element.tagName)) map.set(element.tagName, []);
      map.get(element.tagName).push(element.textContent.trim());
      if (element.textContent && element.href && element.href !== "/ar/fatwa/" && element.href.startsWith("/ar/fatwa/") && element.tagName == "A" && element.href.split("/")[3] && /^-?\d+$/.test(element.href.split("/")[3])) {
        related_fatwas.push(new IslamWebFatwa(element.href, element.textContent.trim()))
      }
    }
    const content: any = map.has("BODY") ? map.get("BODY")[0].replaceAll("\t", "") : map.get("DIV")[0].replaceAll("\t", "");
    const ask:string = map.get("P")[0].trim();
    const answer:string = map.get("P").slice(2, -3).join("\n").trim();
    const arabicDate = content.match(/تاريخ النشر:(.*)/) ? content.match(/تاريخ النشر:(.*)/)[1].trim() : undefined;
    const fatwa_number = content.match(/رقم الفتوى:(.*)/) ? Number(content.match(/رقم الفتوى:(.*)/)[1].trim()) : undefined;
    if (content.includes("لا يوجد فتوى بهذا الرقم")) throw Error("There is no fatwa on this number")

    const title: string = map.has("H1") && map.get("H1")[2] ? map.get("H1")[2].trim() : undefined
    const description: string | null | undefined = dom.window.document.querySelector('meta[name="description"]')?.getAttribute("content")
    const author: string | null | undefined = dom.window.document.querySelector('meta[itemprop="author"]')?.getAttribute("content")

    const dateSplit = arabicDate && arabicDate.split(" - ")[0] ? arabicDate.split(" - ") : undefined;
    const gregorianDateMatch = dateSplit ? arabicDate.match(/(\d{1,2})-(\d{1,2})-(\d{4})/) : undefined;

    return {
      title, author, description, link: this.link, fatwa_number, ask, answer, created_at: {
        text: gregorianDateMatch && gregorianDateMatch[0] ? gregorianDateMatch[0] : arabicDate, hijri: arabicDate,
        day: gregorianDateMatch && gregorianDateMatch[1] ? +gregorianDateMatch[1] : undefined, month: gregorianDateMatch && gregorianDateMatch[2] ? +gregorianDateMatch[2] : undefined, year: gregorianDateMatch && gregorianDateMatch[3] ? +gregorianDateMatch[3] : undefined, iso: gregorianDateMatch && gregorianDateMatch[0] ? new Date(+gregorianDateMatch[3], +gregorianDateMatch[2] - 1, +gregorianDateMatch[1]) : undefined
      }, related_fatwas
    }
  }
}

async function islamweb_search(input: string, page: number): Promise<IslamWebFatwa[]> {
  const response = await axios.get('https://search.islamweb.net/ver3/ar/SearchEngine/fattab.php?start=' + (page - 1) * 35 + '&R1=0&wheretosearch=0&txt=' + encodeURI(input.trim()),
    {
      responseType: 'arraybuffer'
    });
  const sanitizedHtml = iconv.decode(Buffer.from(response.data), 'windows-1256').replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  const dom = parseHTML(sanitizedHtml);
  const links: any[] = []
  const elements: any = dom.window.document.querySelectorAll('*');
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].textContent && elements[i].href && elements[i].href !== "/ar/fatwa/" && elements[i].href.startsWith("/ar/fatwa/") && elements[i].tagName == "A") {
      links.push(new IslamWebFatwa(elements[i].href, elements[i].textContent.trim()))
    }
  }
  return links
}

export { IslamWebFatwa, islamweb_search }