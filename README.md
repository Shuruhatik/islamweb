
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
	//page: 2 // يمكننك وضع صفحة البحث مع علم ان بشكل افتراضي تكون صفحة رقم واحد
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
	//page: 2 // يمكننك وضع صفحة البحث مع علم ان بشكل افتراضي تكون صفحة رقم واحد
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
  title: 'زكاة من لديه مال واشترى شقة من الحكومة بالدين',
  author: 'Islamweb',
  description: 'زكاة من لديه مال واشترى شقة من الحكومة بالدين لدي مال أجمعه؛ لأشتري به مسكنا وتقدمت لشراء عقار من العقارات التي تطرحها الحكومة والحمد لله ح
صلت على شقة ودفعت جزءا بسيطا من ثمنها ومستحق علي جزء آخر واجب الدفع خلال شهر وباقي ثمن الشقة لم يتحدد موعد دفعه فربما بعد شهرين وربما بعد 6 أشهر وربما بعد 
سنة والمبلغ..',
  link: 'https://www.islamweb.net/ar/fatwa/474178',
  fatwa_number: 474178,
  ask: 'لدي مال أجمعه؛ لأشتري به مسكنا، وتقدمت لشراء عقار من العقارات التي تطرحها الحكومة، والحمد لله حصلت على شقة، ودفعت جزءاً بسيطاً من ثمنها، ومستحق علي
 جزء آخر واجب الدفع خلال شهر، وباقي ثمن الشقة لم يتحدد موعد دفعه، فربما بعد شهرين، وربما بعد 6 أشهر، وربما بعد سنة.\r\n' +
    'والمبلغ سوف يكمل هذا الشهر حولا كاملا، وهو يبلغ نصاب الزكاة. فهل علي إخراج زكاة عن كامل المبلغ؟ أم إخراج زكاة عن المبلغ مخصوم منه المبلغ المستحق هذا ا
لشهر؟ أم الزكاة على المبلغ المتبقي بعد خصم كامل ثمن الشقة؟ فقد أصبحت الشقة لي، وأصبح المال مستحقا للهيئة الحكومية.\r\n' +
    'علما أنني لم أمض العقد وأستلم حتى الآن، لأن العقد، والاستلام مع دفع باقي ثمن الشقة، ولكن وقع علي الاختيار، ودفعت جزءاً منها كحجز لها.',
  answer: 'الحمد لله، والصلاة والسلام على رسول الله، وعلى آله، وصحبه، أما بعد:\n' +
    'فإذا كان ثمن الشقة قد أصبح ديناً لازماً عليك للحكومة، فلك أن تخصم منه قيمة الدين الذي عليك -إذا لم يكن عندك أموال أخرى زائدة عن الحاجة تجعلها في مقابل
ة الدين- فتخصم قيمة الدين من المال الذي جمعته، وتزكي ما بقي إن لم يقل عن النصاب، وتخرج منه ربع العشر، أي 2.5% .\n' +
    'قال المرداوي في الإنصاف: لَوْ كَانَ لَهُ عَرَضُ قُنْيَةٍ يُبَاعُ لَوْ أَفْلَسَ بَقِيَ بِمَا عَلَيْهِ مِن الدَّيْنِ جُعِلَ فِي مُقَابَلَةِ مَا عَلَيْهِ
 مِن الدَّيْنِ، وَزَكَّى مَا مَعَهُ مِن الْمَالِ، عَلَى إحْدَى الرِّوَايَتَيْنِ، قَالَ الْقَاضِي: هَذَا قِيَاسُ الْمَذْهَبِ، ونصره أبو المعالي اعتبارا بما 
فيه الحظ للمساكين. اهـ.\r\n' +
    'فالخلاصة أنك لا تخصم من المال الذي جمعته إلا ما أصبح دينا لازما عليك، سواء وقعت العقد، أو لم توقع،  وفي هذه الحال تخصم ما لزمك سواء أكان ثمن الشقة كام
لا، أم ثمن حجز الشقة فقط.\n' +
    'وللفائدة يرجى مراجعة هذه الفتاوى: 310492 ، 127160 ، 164663 .\n' +
    'والله أعلم.',
  created_at: {
    text: '17-4-2023',
    hijri: 'الإثنين 27 رمضان 1444 هـ - 17-4-2023 م',
    day: 17,
    month: 4,
    year: 2023,
    iso: 2023-04-16T22:00:00.000Z
  },
  related_fatwas: [
    IslamWebFatwa {
      title: '310492',
      link: 'https://www.islamweb.net/ar/fatwa/310492/%D8%AE%D8%B5%D9%85-%D8%A7%D9%84%D8%AF%D9%8A%D9%86-%D9%85%D9%86-%D8%A7%D9%84%D9%85%D8%A7%D9%84-%D8%A7%
D9%84%D9%88%D8%A7%D8%AC%D8%A8-%D8%B2%D9%83%D8%A7%D8%AA%D9%87',
      fatwa_number: 310492,
      shortLink: 'https://www.islamweb.net/ar/fatwa/310492'
    },
    IslamWebFatwa {
      title: '127160',
      link: 'https://www.islamweb.net/ar/fatwa/127160/%D9%87%D9%84-%D8%AA%D8%AC%D8%A8-%D8%A7%D9%84%D8%B2%D9%83%D8%A7%D8%A9-%D8%A5%D8%B0%D8%A7-%D9%83%D8%A7%
D9%86-%D8%B9%D9%84%D9%8A%D9%87-%D8%AF%D9%8A%D9%86-%D9%8A%D9%81%D9%88%D9%82-%D9%85%D8%A7%D9%84%D9%87',
      fatwa_number: 127160,
      shortLink: 'https://www.islamweb.net/ar/fatwa/127160'
    },
    IslamWebFatwa {
      title: '164663',
      link: 'https://www.islamweb.net/ar/fatwa/164663/%D9%85%D8%B3%D8%A3%D9%84%D8%A9-%D8%A5%D8%B3%D9%82%D8%A7%D8%B7-%D8%A7%D9%84%D8%AF%D9%8A%D9%86-%D9%85%D
9%86-%D8%A7%D9%84%D8%B2%D9%83%D8%A7%D8%A9',
      fatwa_number: 164663,
      shortLink: 'https://www.islamweb.net/ar/fatwa/164663'
    },
    IslamWebFatwa {
      title: 'زكاة من لديه مال بلغ النصاب وعليه ديون',
      link: 'https://www.islamweb.net/ar/fatwa/472309/%D8%B2%D9%83%D8%A7%D8%A9-%D9%85%D9%86-%D9%84%D8%AF%D9%8A%D9%87-%D9%85%D8%A7%D9%84-%D8%A8%D9%84%D8%BA-
%D8%A7%D9%84%D9%86%D8%B5%D8%A7%D8%A8-%D9%88%D8%B9%D9%84%D9%8A%D9%87-%D8%AF%D9%8A%D9%88%D9%86',
      fatwa_number: 472309,
      shortLink: 'https://www.islamweb.net/ar/fatwa/472309'
    },
    IslamWebFatwa {
      title: 'أحكام خصم الدين من الزكاة',
      link: 'https://www.islamweb.net/ar/fatwa/472042/%D8%A3%D8%AD%D9%83%D8%A7%D9%85-%D8%AE%D8%B5%D9%85-%D8%A7%D9%84%D8%AF%D9%8A%D9%86-%D9%85%D9%86-%D8%A7%
D9%84%D8%B2%D9%83%D8%A7%D8%A9',
      fatwa_number: 472042,
      shortLink: 'https://www.islamweb.net/ar/fatwa/472042'
    },
    IslamWebFatwa {
      title: 'زكاة من لديه مبلغ وحال عليه الحول واشترى سلعة بالأقساط',
      link: 'https://www.islamweb.net/ar/fatwa/471370/%D8%B2%D9%83%D8%A7%D8%A9-%D9%85%D9%86-%D9%84%D8%AF%D9%8A%D9%87-%D9%85%D8%A8%D9%84%D8%BA-%D9%88%D8%AD%
D8%A7%D9%84-%D8%B9%D9%84%D9%8A%D9%87-%D8%A7%D9%84%D8%AD%D9%88%D9%84-%D9%88%D8%A7%D8%B4%D8%AA%D8%B1%D9%89-%D8%B3%D9%84%D8%B9%D8%A9-%D8%A8%D8%A7%D9%84%D8%A3%
D9%82%D8%B3%D8%A7%D8%B7',
      fatwa_number: 471370,
      shortLink: 'https://www.islamweb.net/ar/fatwa/471370'
    },
    IslamWebFatwa {
      title: 'زكاة من اشترى هو وشريكه محلا للتجارة بالتقسيط ثم قاما بتأجيره',
      link: 'https://www.islamweb.net/ar/fatwa/468709/%D8%B2%D9%83%D8%A7%D8%A9-%D9%85%D9%86-%D8%A7%D8%B4%D8%AA%D8%B1%D9%89-%D9%87%D9%88-%D9%88%D8%B4%D8%B1%
D9%8A%D9%83%D9%87-%D9%85%D8%AD%D9%84%D8%A7-%D9%84%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D8%A9-%D8%A8%D8%A7%D9%84%D8%AA%D9%82%D8%B3%D9%8A%D8%B7-%D8%AB%D9%85-%D9%82%
D8%A7%D9%85%D8%A7-%D8%A8%D8%AA%D8%A3%D8%AC%D9%8A%D8%B1%D9%87',
      fatwa_number: 468709,
      shortLink: 'https://www.islamweb.net/ar/fatwa/468709'
    },
    IslamWebFatwa {
      title: 'زكاة من عليه دين وله مال غير زكوي يساوي قيمة الدين',
      link: 'https://www.islamweb.net/ar/fatwa/469138/%D8%B2%D9%83%D8%A7%D8%A9-%D9%85%D9%86-%D8%B9%D9%84%D9%8A%D9%87-%D8%AF%D9%8A%D9%86-%D9%88%D9%84%D9%87-
%D9%85%D8%A7%D9%84-%D8%BA%D9%8A%D8%B1-%D8%B2%D9%83%D9%88%D9%8A-%D9%8A%D8%B3%D8%A7%D9%88%D9%8A-%D9%82%D9%8A%D9%85%D8%A9-%D8%A7%D9%84%D8%AF%D9%8A%D9%86',    
      fatwa_number: 469138,
      shortLink: 'https://www.islamweb.net/ar/fatwa/469138'
    },
    IslamWebFatwa {
      title: 'زكاة مَن عنده مبلغ مدّخر مساوٍ لما عليه من ثمن البيت الذي اشتراه',
      link: 'https://www.islamweb.net/ar/fatwa/466555/%D8%B2%D9%83%D8%A7%D8%A9-%D9%85%D9%8E%D9%86-%D8%B9%D9%86%D8%AF%D9%87-%D9%85%D8%A8%D9%84%D8%BA-%D9%85%
D8%AF%D9%91%D8%AE%D8%B1-%D9%85%D8%B3%D8%A7%D9%88%D9%8D-%D9%84%D9%85%D8%A7-%D8%B9%D9%84%D9%8A%D9%87-%D9%85%D9%86-%D8%AB%D9%85%D9%86-%D8%A7%D9%84%D8%A8%D9%8A
%D8%AA-%D8%A7%D9%84%D8%B0%D9%8A-%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%87',
      fatwa_number: 466555,
      shortLink: 'https://www.islamweb.net/ar/fatwa/466555'
    },
    IslamWebFatwa {
      title: 'هل تجب الزكاة على مَن كان عليه دَين يساوي المبلغ الذي ادّخره؟',
      link: 'https://www.islamweb.net/ar/fatwa/466486/%D9%87%D9%84-%D8%AA%D8%AC%D8%A8-%D8%A7%D9%84%D8%B2%D9%83%D8%A7%D8%A9-%D8%B9%D9%84%D9%89-%D9%85%D9%8E%
D9%86-%D9%83%D8%A7%D9%86-%D8%B9%D9%84%D9%8A%D9%87-%D8%AF%D9%8E%D9%8A%D9%86-%D9%8A%D8%B3%D8%A7%D9%88%D9%8A-%D8%A7%D9%84%D9%85%D8%A8%D9%84%D8%BA-%D8%A7%D9%84
%D8%B0%D9%8A-%D8%A7%D8%AF%D9%91%D8%AE%D8%B1%D9%87',
      fatwa_number: 466486,
      shortLink: 'https://www.islamweb.net/ar/fatwa/466486'
    },
    IslamWebFatwa {
      title: 'أقوال العلماء في سقوط الجمعة لمن شهد صلاة العيد',
      link: 'https://www.islamweb.net/ar/fatwa/15442/%D8%A3%D9%82%D9%88%D8%A7%D9%84-%D8%A7%D9%84%D8%B9%D9%84%D9%85%D8%A7%D8%A1-%D9%81%D9%8A-%D8%B3%D9%82%D9
%88%D8%B7-%D8%A7%D9%84%D8%AC%D9%85%D8%B9%D8%A9-%D9%84%D9%85%D9%86-%D8%B4%D9%87%D8%AF-%D8%B5%D9%84%D8%A7%D8%A9-%D8%A7%D9%84%D8%B9%D9%8A%D8%AF',
      fatwa_number: 15442,
      shortLink: 'https://www.islamweb.net/ar/fatwa/15442'
    },
    IslamWebFatwa {
      title: 'كيفية صلاة العيدين',
      link: 'https://www.islamweb.net/ar/fatwa/4058/%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%B5%D9%84%D8%A7%D8%A9-%D8%A7%D9%84%D8%B9%D9%8A%D8%AF%D9%8A%D9%86',   
      fatwa_number: 4058,
      shortLink: 'https://www.islamweb.net/ar/fatwa/4058'
    },
    IslamWebFatwa {
      title: 'تأخير الغسل من الحيض بعد طلوع الفجر لا أثر له على الصيام',
      link: 'https://www.islamweb.net/ar/fatwa/125984/%D8%AA%D8%A3%D8%AE%D9%8A%D8%B1-%D8%A7%D9%84%D8%BA%D8%B3%D9%84-%D9%85%D9%86-%D8%A7%D9%84%D8%AD%D9%8A%D
8%B6-%D8%A8%D8%B9%D8%AF-%D8%B7%D9%84%D9%88%D8%B9-%D8%A7%D9%84%D9%81%D8%AC%D8%B1-%D9%84%D8%A7-%D8%A3%D8%AB%D8%B1-%D9%84%D9%87-%D8%B9%D9%84%D9%89-%D8%A7%D9%8
4%D8%B5%D9%8A%D8%A7%D9%85',
      fatwa_number: 125984,
      shortLink: 'https://www.islamweb.net/ar/fatwa/125984'
    },
    IslamWebFatwa {
      title: 'حكم إخراج زكاة الفطر نقدا',
      link: 'https://www.islamweb.net/ar/fatwa/71201/%D8%AD%D9%83%D9%85-%D8%A5%D8%AE%D8%B1%D8%A7%D8%AC-%D8%B2%D9%83%D8%A7%D8%A9-%D8%A7%D9%84%D9%81%D8%B7%D8
%B1-%D9%86%D9%82%D8%AF%D8%A7',
      fatwa_number: 71201,
      shortLink: 'https://www.islamweb.net/ar/fatwa/71201'
    },
    IslamWebFatwa {
      title: 'أقوال العلماء في حكم قطرة العين للصائم',
      link: 'https://www.islamweb.net/ar/fatwa/6302/%D8%A3%D9%82%D9%88%D8%A7%D9%84-%D8%A7%D9%84%D8%B9%D9%84%D9%85%D8%A7%D8%A1-%D9%81%D9%8A-%D8%AD%D9%83%D9%
85-%D9%82%D8%B7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D9%8A%D9%86-%D9%84%D9%84%D8%B5%D8%A7%D8%A6%D9%85',
      fatwa_number: 6302,
      shortLink: 'https://www.islamweb.net/ar/fatwa/6302'
    },
    IslamWebFatwa {
      title: 'الصائم إذا غلبه القيء',
      link: 'https://www.islamweb.net/ar/fatwa/139778/%D8%A7%D9%84%D8%B5%D8%A7%D8%A6%D9%85-%D8%A5%D8%B0%D8%A7-%D8%BA%D9%84%D8%A8%D9%87-%D8%A7%D9%84%D9%82%D
9%8A%D8%A1',
      fatwa_number: 139778,
      shortLink: 'https://www.islamweb.net/ar/fatwa/139778'
    },
    IslamWebFatwa {
      title: 'لا يشترط لصحة الصوم الاغتسال من الحيض',
      link: 'https://www.islamweb.net/ar/fatwa/39435/%D9%84%D8%A7-%D9%8A%D8%B4%D8%AA%D8%B1%D8%B7-%D9%84%D8%B5%D8%AD%D8%A9-%D8%A7%D9%84%D8%B5%D9%88%D9%85-%D
8%A7%D9%84%D8%A7%D8%BA%D8%AA%D8%B3%D8%A7%D9%84-%D9%85%D9%86-%D8%A7%D9%84%D8%AD%D9%8A%D8%B6',
      fatwa_number: 39435,
      shortLink: 'https://www.islamweb.net/ar/fatwa/39435'
    },
    IslamWebFatwa {
      title: 'حكم قراءة القرآن  ومسه بدون وضوء',
      link: 'https://www.islamweb.net/ar/fatwa/12540/%D8%AD%D9%83%D9%85-%D9%82%D8%B1%D8%A7%D8%A1%D8%A9-%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86-%D9%88%D9%85%D8
%B3%D9%87-%D8%A8%D8%AF%D9%88%D9%86-%D9%88%D8%B6%D9%88%D8%A1',
      fatwa_number: 12540,
      shortLink: 'https://www.islamweb.net/ar/fatwa/12540'
    },
    IslamWebFatwa {
      title: 'أحاديث العتق من النار كل ليلة من رمضان',
      link: 'https://www.islamweb.net/ar/fatwa/163749/%D8%A3%D8%AD%D8%A7%D8%AF%D9%8A%D8%AB-%D8%A7%D9%84%D8%B9%D8%AA%D9%82-%D9%85%D9%86-%D8%A7%D9%84%D9%86%D
8%A7%D8%B1-%D9%83%D9%84-%D9%84%D9%8A%D9%84%D8%A9-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86',
      fatwa_number: 163749,
      shortLink: 'https://www.islamweb.net/ar/fatwa/163749'
    }
  ]
}
```
  
إذا كان لديك مشكلة أو لديك اقتراح
------------
- تواصل معي ديسكورد: [`Shuruhatik#2443`](https://github.com/shuruhatik)
- [Github](https://github.com/shuruhatik) | [Youtube](https://www.youtube.com/@shuruhatik) | [My Website](https://www.shuruhatik.com/) | [Discord Server](http://dsc.gg/shuruhatik) | [My Website](https://www.shuruhatik.com/) 
  
License
-------

Refer to the [LICENSE](LICENSE) file.