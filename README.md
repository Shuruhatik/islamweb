
IslamWeb [![NPM version](https://img.shields.io/npm/v/islamweb.svg?style=flat-square&color=informational)](https://npmjs.com/package/islamweb)
====
تساعدك الحزمة في الحصول على معلومات حول فتوى أو البحث عن فتوى بسهولة باستخدام موقع [إسلام ويب](https://islamweb.net/) أو من خلال موقع [الإسلام سؤال وجواب](https://islamqa.info/ar/) 

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
const { search, getDetails } =  require('islamweb');
```
[TypeScript](https://www.typescriptlang.org/)/ES Module support
```ts
import { search, getDetails } from  'islamweb';
```
[Deno](https://deno.land)
```js
import { search, getDetails } from  'https://esm.sh/islamweb';
```

مثال:
-----------------
- ابحث عن فتوى مثل الزكاة او غيرها او سؤال
```js
//الإسلام سؤال وجواب
search("الزكاءة", {
	website:  "islamqa",
	//lang:"ar"|"fr"|"en"|"tr"|"fa"|"id"|"ur"|"ug"|"ge"|"bn"|"ru"|"es"|  "hi"  |  "pt"  |  "tg",
	/* 
		 بوضع الافتراضي تكون اللغة العربية وخيار اختيار اللغة مدعوم فقط islamqa
	*/
	//puppeteerLaunchOptions: {} // يمكننك وضع خيارات اضافية تعمل في تشغيل puppeteer
}).then(async results => {
	if(results.length == 0){
		console.log("لا يوجد نتائج بحث")
	} else {
		 console.log(results)//نتائج البحث
		 console.log(await  results[0].getDetails())//يقوم بارجاع لك تفاصيل الفتوي الاولي
	 }
})

//إسلام ويب
search("الزكاءة", {
	website:  "islamweb",
	//puppeteerLaunchOptions: {} // يمكننك وضع خيارات اضافية تعمل في تشغيل puppeteer
}).then(async results => {
	if(results.length == 0){
		console.log("لا يوجد نتائج بحث")
	} else {
		 console.log(results)//نتائج البحث
		 console.log(await  results[0].getDetails())//يقوم بارجاع لك تفاصيل الفتوي الاولي
	 }
})
```
- جلب تفاصيل الفتوى برقم الفتوى
```js
getDetails({
  fatwa_number:69818,
  //link:"",// أو يمكننك وضع رابط الفتوي بدل من رقم الفتوي 
  website:"islamqa" // حال كانت الفتوي من اسلام ويب يمكننك وضع "islamweb"
}).then(result => {
  console.log(result)
})
```

النتائج
-----------------
- مثال لنتيجة البحث `search()`
```js
[
  IslamQaFatwa {
    title: 'حكم العمل في البرمجة في شركة تبيع برامجها لعملاء منهم بنوك ربوية ...',
    link: 'https://islamqa.info/ar/answers/179833/%D8%AD%D9%83%D9%85-%D8%A7%D9%84%D8%B9%D9%85%D9%84-%D9%81%D9%8A-%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D8%A9-%D9%8
1%D9%8A-%D8%B4%D8%B1%D9%83%D8%A9-%D8%AA%D8%A8%D9%8A%D8%B9-%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%D9%87%D8%A7-%D9%84%D8%B9%D9%85%D9%84%D8%A7%D8%A1-%D9%85%D9%86%D9%87%D9%8
5-%D8%A8%D9%86%D9%88%D9%83-%D8%B1%D8%A8%D9%88%D9%8A%D8%A9-%D9%88%D8%B4%D8%B1%D9%83%D8%A7%D8%AA-%D8%AA%D8%A7%D9%85%D9%8A%D9%86',
    fatwa_number: 179833,
    shortLink: 'https://islamqa.info/ar/answers/179833'
  },
  IslamQaFatwa {
    title: 'حكم العمل في البرمجة في شركة تبيع برامجها لعملاء منهم بنوك ربوية ...',
    link: 'https://islamqa.info/ar/answers/179833/%D8%AD%D9%83%D9%85-%D8%A7%D9%84%D8%B9%D9%85%D9%84-%D9%81%D9%8A-%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D8%A9-%D9%8
1%D9%8A-%D8%B4%D8%B1%D9%83%D8%A9-%D8%AA%D8%A8%D9%8A%D8%B9-%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%D9%87%D8%A7-%D9%84%D8%B9%D9%85%D9%84%D8%A7%D8%A1-%D9%85%D9%86%D9%87%D9%8
5-%D8%A8%D9%86%D9%88%D9%83-%D8%B1%D8%A8%D9%88%D9%8A%D8%A9-%D9%88%D8%B4%D8%B1%D9%83%D8%A7%D8%AA-%D8%AA%D8%A7%D9%85%D9%8A%D9%86',
    fatwa_number: 179833,
    shortLink: 'https://islamqa.info/ar/answers/179833'
  }, ...and more results
]
```
- مثال لنتيجة تفاصيل الفتوي `getDetails()`
```js
{
  link: 'https://islamqa.info/ar/answers/37765',
  fatwa_number: 37765,
  ask: 'أعلم أن بعض العلماء قد حرموا التدخين، ولكن لماذا يحرم التدخين أثناء الصيام مع أنه لا يوجد شيء من الطعام أو الشراب يدخل الحلق ؟',
  answer: 'الحمد لله.الدخان محرم ولا يشك في تحريمه – انظر السؤال رقم ( 10922 ) و ( 7432 ) - ، وأما سبب كونه مفطراً فلأن له جرماً يصل إلى الجوف والمعدة .\n' +    
    '\n' +
    'سئل الشيخ ابن عثيمين عن استنشاق العطر للصائم فقال :\n' +
    '\n' +
    'يجوز أن يستعملها في نهار رمضان وأن يستنشقها إلا البخور لا يستنشقه لأن له جرماً يصل إلى المعدة وهو الدخان .\n' +
    '\n' +
    '" فتاوى إسلامية " ( 2 / 128 ) .\n' +
    '\n' +
    'والدخان مثل البخور في كونهما لهما جرم لكنهما يختلفان من حيث حكم الأصل فالبخور حلال طيب والدخان محرم خبيث .',
  created_at: {
    text: '22-09-2008',
    day: 22,
    month: 9,
    year: 2008,
    iso: 2008-09-21T22:00:00.000Z
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