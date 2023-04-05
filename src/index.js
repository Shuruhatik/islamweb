"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.getDetails = void 0;
const islamqa_js_1 = require("./islamqa.js");
const islamweb_js_1 = require("./islamweb.js");
const formatErrorMessage = (reason, method_name, type = "function", var1, var2) => {
    console.log(`\x1b[36m`);
    return `\u001b[38;5;251m> \u001b[38;5;2mIslamWeb Package\n    \u001b[38;5;160m${reason}\n\n    \u001b[38;5;160mClass:\n    \u001b[38;5;243m|  \u001b[38;5;34m'${method_name}' ${var1 ? `\x1b[4m\u001b[38;5;243m->\x1b[0m \u001b[38;5;243m\u001b[38;5;34m'${var1}'\u001b[38;5;243m` : ``}${var2 ? `\u001b[38;5;243m\x1b[4m->\x1b[0m \u001b[38;5;34m'${var2}'` : ""}\x1b[0m`;
};
async function getDetails(options) {
    if (!options.website)
        throw Error(formatErrorMessage("You must choose a search method through islamweb.net or islamqa.info", "search", "function", "options", "website"));
    if (options.website.includes("islamweb")) {
        if (options.link && !options.fatwa_number)
            options.fatwa_number = +options.link.split("/")[5];
        const fatwa = new islamweb_js_1.IslamWebFatwa(`${options.fatwa_number}`);
        return await fatwa.getDetails(options.puppeteerLaunchOptions || {});
    }
    else if (options.website.includes("islamq")) {
        if (options.link && !options.fatwa_number)
            options.fatwa_number = +options.link.split("/")[5];
        const fatwa = new islamqa_js_1.IslamQaFatwa(`${options.fatwa_number}`, undefined, options.lang || "ar");
        return await fatwa.getDetails(options.puppeteerLaunchOptions || {});
    }
    else
        throw Error(formatErrorMessage("You must choose a search method through islamweb.net or islamqa.info", "search", "function", "options", "website"));
}
exports.getDetails = getDetails;
async function search(input, options) {
    if (!options.website)
        throw Error(formatErrorMessage("You must choose a search method through islamweb.net or islamqa.info", "search", "function", "options", "website"));
    if (options.website.includes("islamweb")) {
        return await (0, islamweb_js_1.islamweb_search)(input, options.timeout || 3000, options.puppeteerLaunchOptions || {});
    }
    else if (options.website.includes("islamq")) {
        if (!options.lang)
            options.lang = "ar";
        if (!["ar", "fr", "en", "tr", "fa", "id", "ur", "ug", "ge", "bn", "ru", "es", "hi", "pt", "tg"].some(l => l == options.lang))
            throw Error(formatErrorMessage('You must choose a language from among these available languages, which is "ar" | "fr" | "en" | "tr" | "fa" | "id" | "ur" | "ug" | "ge" | "bn" | "ru" | "es" | "hi" | "pt" | "tg"', "search", "function", "options", "lang"));
        return await (0, islamqa_js_1.islamqa_search)(input, options.lang, options.timeout || undefined, options.puppeteerLaunchOptions || {});
    }
    else
        throw Error(formatErrorMessage("You must choose a search method through islamweb.net or islamqa.info", "search", "function", "options", "website"));
}
exports.search = search;
//# sourceMappingURL=index.js.map