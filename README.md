
IslamWeb [![NPM version](https://img.shields.io/npm/v/islamweb.svg?style=flat-square&color=informational)](https://npmjs.com/package/islamweb)
====
تساعدك الحزمة في الحصول على معلومات حول فتوى أو البحث عن فتوى بسهولة باستخدام موقع إسلام ويب
- ملحوظة: الحزمة لم تصدر بشكل رسمي من موقع إسلام ويب وهذه حزمة غير رسمية

التثبيت
----------

تثبيت مع [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com) / [pnpm](https://pnpm.js.org/) / [bun](https://bun.sh/):

```sh
npm install islamweb
yarn add islamweb
pnpm add islamweb
bun install islamweb
```

إستعمال
-----------------
استخدام [Node.js](https://nodejs.org/) `require()`
```js
const { search, Fatwa } =  require('islamweb');
```
[TypeScript](https://www.typescriptlang.org/)/ES Module support
```ts
import { search, Fatwa } from  'islamweb';
```
[Deno](https://deno.land)
```js
import { search, Fatwa } from  'https://esm.sh/islamweb';
```

مثال:
-----------------
- ابحث عن فتوى مثل الزكاة او غيرها او سؤال
```js
const input = "الزكاة"
const results = await search(input ) //timeout = 1500ms by defult

// مغ تغير التايم اوت
const results_with_timeout = await search(input,5000) 
/* 
ملحوظة يجب علي تغيره في حال أن جميع نتائج البحث كانت مصفوفة فارغة 
وذلك قد يرجع بسبب الانترنت لديك او لدي مزود الخدمة لديك لذلك يجب عليك تمديد مدة التايم اوت
*/


if(results.length == 0){
	console.log("لا يوجد نتائج بحث أو ان تايم اوت للبحث من انترنت لم تكفي")
	// يجب عليك اعادة محاولة وتغير مدة تايم اوت لمدة مناسبة للانترنت لديك
} else {
	console.log(results) // نتائج البحث
}
```
- جلب تفاصيل الفتوى برقم الفتوى
```js
// مثال من خلال نتيجة بحث
const index = 0;
results[index].getDetails().then(console.log);

// من خلال رقم الفتوي بشكل يدوي
const fatwa = new Fatwa("165");
.fatwa getDetails().then(console.log);
```

النتائج
-----------------
- مثال لنتيجة البحث `search()`
```js
[
  Fatwa {
    title: 'يزكى المال إذا تحققت فيه شروط الوجوب',
    link: 'https://www.islamweb.net/ar/fatwa/165/?searchKey=0nLBYLOawddbP7v2tBaR&wheretosearch=0&order=&RecID=0&srchwords=%C7%E1%D2%DF%C7%C9&R1=0&R2=0&hIndex=',
    fatwa_number: 165,
    shortLink: 'https://www.islamweb.net/ar/fatwa/165'
  },
  Fatwa {
    title: 'كيفية زكاة الأسهم',
    link: 'https://www.islamweb.net/ar/fatwa/186/?searchKey=0nLBYLOawddbP7v2tBaR&wheretosearch=0&order=&RecID=1&srchwords=%C7%E1%D2%DF%C7%C9&R1=0&R2=0&hIndex=',
    fatwa_number: 186,
    shortLink: 'https://www.islamweb.net/ar/fatwa/186'
  }, ...and more results
]
```
- مثال لنتيجة تفاصيل الفتوي `getDetails()`
```js
{
  title: 'يزكى المال إذا تحققت فيه شروط الوجوب',
  link: 'https://www.islamweb.net/ar/fatwa/165/?searchKey=0nLBYLOawddbP7v2tBaR&wheretosearch=0&order=&RecID=0&srchwords=%C7%E1%D2%DF%C7%C9&R1=0&R2=0&hIndex=',
  fatwa_number: 165,
  shortLink: 'https://www.islamweb.net/ar/fatwa/165',
  answer: 'الحمد لله والصلاة والسلام على رسول الله وبعد:          يخرج من المال ربع العشر ـ زكاة ـ إذا بلغ نصاباً، والنصاب هو عشرون مثقالاً وهو ما يعادل 85 جراما من الذهب، فإذا كان لديك مال قيمته تعادل قيمة 85 جراما من الذهب، زائداً عن حاجاتك الأصلية، وقد حال عليه الحول، وجب عليك إخراج الزكاة  عنه.   والله أعلم.',
  ask: 'ما هو نصاب زكاة النقود؟\n    الدولار الأمريكي =150 بزتة إسبانية',
  created_at: {
    text: 'الثلاثاء 28 ربيع الآخر 1420 هـ - 10-8-1999 م',
    date: '10/8/1999',
    hijri: 'الثلاثاء 28 ربيع الآخر 1420 هـ'
  }
}
```
  
إذا كان لديك مشكلة أو لديك اقتراح
------------
- تواصل معي ديسكورد: [`Shuruhatik#2443`](https://github.com/shuruhatik)
- [Github](https://github.com/shuruhatik) | [Youtube](https://www.youtube.com/@shuruhatik) | [My Website](https://www.shuruhatik.com/) | [Discord Server](http://dsc.gg/shuruhatik) | [My Website](https://www.shuruhatik.com/) 
  
License
-------

Refer to the [LICENSE](LICENSE) file.