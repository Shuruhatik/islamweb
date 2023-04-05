import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer';
import { JSDOM } from 'jsdom';

class IslamQaFatwa {
  link: string;
  fatwa_number: number;
  shortLink: string;
  constructor(url: string, readonly title?: string, lang?: string) {
    this.link = url.split("/")[5] ? url : `https://islamqa.info/${lang || "ar"}/answers/${url}`;
    this.fatwa_number = this.link.split("/")[5] ? +this.link.split("/")[5] : 0;
    this.shortLink = `https://islamqa.info/${lang || "ar"}/answers/${this.fatwa_number}`;
  }
  async getDetails(puppeteerLaunchOptions?: PuppeteerLaunchOptions): Promise<{
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
  }> {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disabled-setupid-sandbox"], ...puppeteerLaunchOptions
    });
    const page = await browser.newPage();
    await page.goto(this.link);
    const bodyHandle = await page.$('body');
    const html = await page.evaluate((body: any) => body.innerHTML, bodyHandle);
    const sanitizedHtml = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    const dom = new JSDOM(sanitizedHtml);
    const map: Map<any, any> = new Map()
    const elements = dom.window.document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
      const element: any = elements[i];
      if (!map.has(element.tagName)) map.set(element.tagName, []);
      map.get(element.tagName).push(element.textContent.trim());
    }
    const sections = map.has("SECTION") ? map.get("SECTION") : map.get("DIV");
    const created_at_text = map.get("BODY")[0].match(/Publication :(.*)/) ? map.get("BODY")[0].match(/Publication :(.*)/)[1].trim() : map.get("BODY")[0].match(/تاريخ النشر :(.*)/) ? map.get("BODY")[0].match(/تاريخ النشر :(.*)/)[1].trim() : map.get("BODY")[0].match(/Таърихи нашр :(.*)/) ? map.get("BODY")[0].match(/Таърихи нашр :(.*)/)[1].trim() : map.get("BODY")[0].match(/تارقاتقان ۋاقىت :(.*)/) ? map.get("BODY")[0].match(/تارقاتقان ۋاقىت :(.*)/)[1].trim() : map.get("BODY")[0].match(/Data de publicação :(.*)/) ? map.get("BODY")[0].match(/Data de publicação :(.*)/)[1].trim() : map.get("BODY")[0].match(/Herausgabedatum :(.*)/) ? map.get("BODY")[0].match(/Herausgabedatum :(.*)/)[1].trim() : map.get("BODY")[0].match(/प्रकाशन की तिथि :(.*)/) ? map.get("BODY")[0].match(/प्रकाशन की तिथि :(.*)/)[1].trim() : map.get("BODY")[0].match(/تاریخ نشر :(.*)/) ? map.get("BODY")[0].match(/تاریخ نشر :(.*)/)[1].trim() : map.get("BODY")[0].match(/প্রকাশকাল :(.*)/) ? map.get("BODY")[0].match(/প্রকাশকাল :(.*)/)[1].trim() : map.get("BODY")[0].match(/Fecha de publicación :(.*)/) ? map.get("BODY")[0].match(/Fecha de publicación :(.*)/)[1].trim() : map.get("BODY")[0].match(/Дата публикации :(.*)/) ? map.get("BODY")[0].match(/Дата публикации :(.*)/)[1].trim() : map.get("BODY")[0].match(/প্রকাশকাল :(.*)/) ? map.get("BODY")[0].match(/প্রকাশকাল :(.*)/)[1].trim() : map.get("BODY")[0].match(/تاریخ اشاعت :(.*)/) ? map.get("BODY")[0].match(/تاریخ اشاعت :(.*)/)[1].trim() : map.get("BODY")[0].match(/Yayınlama tarihi :(.*)/) ? map.get("BODY")[0].match(/Yayınlama tarihi :(.*)/)[1].trim() : map.get("BODY")[0].match(/Tanggal Tayang :(.*)/) ? map.get("BODY")[0].match(/Tanggal Tayang :(.*)/)[1].trim() : map.get("BODY")[0].match(/Date de publication :(.*)/) ? map.get("BODY")[0].match(/Date de publication :(.*)/)[1].trim() : undefined;
    if (!created_at_text || created_at_text && !created_at_text.split('-')) throw Error("There is no fatwa on this number")
    const fatwa_number = this.link.split("/answers/")[1] ? Number(this.link.split("/answers/")[1].split("/")[0]) : undefined;
    const [day, month, year] = created_at_text.split('-').map(Number);

    return {
      link: this.link, fatwa_number, ask: sections[0].trim().split("\n")[2].trim(), answer: sections[2].trim(), created_at: {
        text: created_at_text, day, month, year, iso: new Date(year, month - 1, day)
      }
    };

  }
}

async function islamqa_search(input: string, lang: string, timeout?: number, puppeteerLaunchOptions?: PuppeteerLaunchOptions): Promise<IslamQaFatwa[]> {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disabled-setupid-sandbox"], ...puppeteerLaunchOptions
  });
  const page = await browser.newPage();
  await page.goto('https://islamqa.info/' + lang + '/google-search?q=' + encodeURI(input.trim()) + '&search_engine=google');

  if (timeout) await page.waitForTimeout(timeout);
  const bodyHandle = await page.$('body');
  const html = await page.evaluate((body: any) => body.innerHTML, bodyHandle);
  const sanitizedHtml = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  const dom = new JSDOM(sanitizedHtml);
  const links: any[] = []
  const elements: any = dom.window.document.getElementsByTagName('*');
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].tagName == "A" && elements[i].href.startsWith("https://islamqa.info/" + lang + "/answers/")) {
      links.push(new IslamQaFatwa(elements[i].href, elements[i].textContent.replaceAll("- الإسلام سؤال وجواب", "").trim(), lang))
    }
  }
  await browser.close();
  return links
}


export { IslamQaFatwa, islamqa_search }