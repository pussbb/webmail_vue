const textToHtmlElemReplaceItems = [
    [new RegExp( "&", "g" ), "&amp;"],
    [new RegExp( "<", "g" ), "&lt;" ],
    [new RegExp( ">", "g" ), "&gt;" ],

];
const parseURLsItemsReplace = [
    [ /((ftp|https?):\/\/[^\s|\)|\]|\}]+)/ig, "$1".link("$1") ],
    [ /\s(www\.(\w+\.)+[^\s|\)|\]|\}]+)/ig, " "+("$1".link("http://$1")) ],
    [ /^(www\.(\w+\.)+[^\s|\)|\]|\}]+)/ig, "$1".link("http://$1") ],
    [ /(([^A-Za-z0-9#_\/])+)<\/a>/g, '</a>$1' ],
    [ /(([^A-Za-z0-9#_\/])+)'>/g, '\'>' ],

];

const parseEmailAddrReqExpr = [
    [/\b([a-z0-9_\-\.]+\@[a-z0-9_\-\.]+\.[a-z0-9_\-\.]+)\b(?![^<]*<\/a>)/gi, "$1".link("mailto:$1")]
];

const unifyEndLineReqExpr = [
    [ /\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;" ],
    [ /( ){2}/g, "&nbsp;&nbsp;" ],
    [/\n/ig, "<br>"]
];

const escapeForRegExpPattern = /([.+*?\\\/{}()\[\]\^~$|\-])/g;
function escapeForRegExp( str ) {
    // escape any characters special to regexps
    return str.replace(escapeForRegExpPattern, "\\$1");
}

function replaceItemsInString(data, items) {
    if (!data) {
        return data;
    }
    items.forEach( item => data = data.replace( item[0], item[1] ))
    return data;
}


export function textToHtml( text, charset='UTF-8') {

    // Escape < and >
    // Note that we do not use escapeHtml here b/c we want to preserve
    // whitespaces for the following regular expressions...
    text = String(text);
    text = replaceItemsInString(text, textToHtmlElemReplaceItems);

    // Format hyperlinks and email links...
    // Add catch a closing prentese, remove it for the link.
    text = replaceItemsInString(text, parseURLsItemsReplace);
    // Format email links
    // The lookahead assertion at the end of the expression -- (?![^<]*<\/a>) -- prevents adding
    // a mailto link to an email nested within a web address by making sure it's not within in a <a> tag
    text = replaceItemsInString(text, parseEmailAddrReqExpr);

    // Preserve spaces
    text = replaceItemsInString(text, unifyEndLineReqExpr);

    return `<html>
                <meta charset="${charset}">
                <body style="font-family:courier new, normal;font-size:12px;">
                ${text}
                </body>
            </html>`
}

export function cleanHtml(displayText="", blockExternalImages=true) {
    let res = disableIFrames(removeEventHandlers(removeScripts(displayText)));
    let imagesBlocked = 0
    if (blockExternalImages) {
        [res, imagesBlocked] = removeExternalImages(res)
    }
    return {
        body: res,
        hasBlockedImages: imagesBlocked > 0
    }
}

const removeScriptsSplitPattern = /<script>|<script\s+[^>]*>/ig ;
const removeScriptsScriptTagPattern = /<\/script\s*>?/i;

// Remove any scripts... This is a "weak" protection against malicious scripts.
// NB: It is not possible to remove the script blocks using the DOM b/c the
// document will have been loaded first, and any global scope function calls
// will have been executed already - See bug #9104
function removeScripts( displayText= "" ) {

    let result = "";

    if (!displayText) {
        return result;
    }

    displayText.split(removeScriptsSplitPattern).forEach(fragment => {
        let match = removeScriptsScriptTagPattern.exec(fragment);
        if ( match ) {
            const idx = fragment.indexOf( match[0] );
            result += fragment.substr( idx + match[0].length );
        } else {
            result += fragment;
        }
    });
    return result;
}

const removeEventHandlersPattern = /<(\s*[^>]*)[\s]on[a-z]+\s*=\s*/i;
// Remove all event handlers - See bug #9105
function removeEventHandlers( displayText = "" ) {
    if (!displayText) {
        return displayText;
    }
    let match;
    while ( ( match = removeEventHandlersPattern.exec(displayText) ) != null ) {
        // Legend:
        // match[0] is the whole match
        // match[1] is the tag name plus some attributes
        let start = displayText.indexOf( match[0] );
        let end = start + match[0].length;
        let quote = displayText.charAt( end );
        if ( quote == '"' || quote == '\'' ) {
            // If the next non-whitespace character is a single
            // or a double quote, the event handling code will
            // end at the next corresponding quote.
            while ( end < displayText.length ) {
                let c = displayText.charAt( ++end );
                if ( c == '>' ) {
                    end--;
                    break;
                } else if ( c == quote ) {
                    break;
                }
            }
        } else {
            // Otherwise, the event handling code will end at
            // either the first white space, or the first
            // semi-colon or the first angle bracket '>'.
            while ( end < displayText.length ) {
                let c = displayText.charAt( ++end );
                if ( c == '>' ) {
                    end--;
                    break;
                } else if ( c == ' ' || c == '\t' || c == ';' ) {
                    break;
                }
            }
        }
        displayText = displayText.substr( 0, start + match[1].length + 1) + displayText.substr( end+1 );
    }

    return displayText;
}

const iframeRegExp = [
    [/<iframe/ig, "<disablediframe"],
    [/<\/iframe/ig, "</disablediframe"]
]

function disableIFrames( displayText = "" ) {
    iframeRegExp.forEach( item => displayText = displayText.replace(item[0], item[1]))
    return displayText;
}

const fixupContentIdsPattern =  /(src\s*=\s*|background\s*=\s*|background-image\s*:\s*url\s*\(\s*)['"]?\s*cid:([a-z0-9:\-_\$\?&%=@\/\.;]+)\s*['"]?(\s*\)\s*;?)?/i;

function fixupContentIds( displayText = "") {
    if (!displayText) {
        return displayText;
    }
    let match;
    while ( ( match = fixupContentIdsPattern.exec(displayText) ) != null ) {
        // Legend:
        // match[0] is the whole match
        // match[1] is either src= or background= or background-image:url(
        // match[2] is the actual content-id
        // match[3] may be ); in the case of a background-image

        ///displayText = displayText.replace( match[0], match[1] + match[3] );
    }
    return displayText;
}

const removeExternalImagesPattern = /<([a-z][a-z0-9]*\s+[^>]*)(src\s*=\s*|background\s*=\s*|background-image\s*:\s*url\s*\(\s*)(['"]?)\s*([a-zA-Z0-9:\-_\$\?&%=@\/\.;]+)\s*(['"]?)/ig;
const removeExternalImagesPattern2 = /(background|background-image)(\s*:\s*url\s*\(\s*)(['"]?)\s*([a-zA-Z0-9:\-_\$\?&%=@\/\.;]+)\s*(['"]?)/ig;
// Remove all external images and backgrounds... These may be used to track
// you (by using a url such as http://domain/image.gif?email=xxx@yyy.com)
// We also want to be able to hide them by default because of the level of
// "vulgarity" of some spam emails (enlarge your thing, etc...)
// NB: It is not possible to remove images using the DOM as they will be
// loaded anyway, so that would be a bit too late!
// NB: The return value is an array containg the result string and how many
// image have been blocked.
// NB: Run this after having removed the scripts...
function removeExternalImages( displayText = "" ) {

    let count = 0;
    let match;
    ///let pattern;
    let str;

    // This pattern will find all HTML tags containing a link
    // (src/background/background-image) to an external source.
    ////pattern =

    while ( ( match = removeExternalImagesPattern.exec(displayText) ) != null ) {

        // Legend:
        // match[0] is the whole match
        // match[1] is the tag itself (and maybe some attributes)
        // match[2] is either src= or background= or background-image:url(
        // match[3] is the starting quote
        // match[4] is the url
        // match[5] is the ending quote

        let url = match[4].toLowerCase();
        if ( !url.startsWith( "cid:" ) ) {
            let attribute = match[2].toLowerCase();
            let startingQuote = match[3];
            let endingQuote = match[5];
            if ( attribute.indexOf( "background-image" ) === -1 &&
                ( startingQuote === "" || endingQuote === "" || startingQuote != endingQuote ) ) {
                startingQuote = "\"";
                endingQuote = "\"";
            }
            str = "<" + match[1] + match[2] + startingQuote + endingQuote + " ";
            displayText = displayText.replace( match[0], str );
            removeExternalImagesPattern.lastIndex = 0;
            count++;
        }
    }

    // This pattern will find any remaining link to external sources
    // (background/background-image declarations in style sheet have
    // not been picked up by the previous pattern...)
    ///pattern =

    while ( ( match = removeExternalImagesPattern2.exec(displayText)) != null ) {

        // Legend:
        // match[0] is the whole match
        // match[1] is background or background-image
        // match[2] is url:(
        // match[3] is the starting quote
        // match[4] is the url
        // match[5] is the ending quote

        //let url = match[4].toLowerCase();
        //if ( !url.startsWith( "cid:" ) ) {
            str = match[1] + match[5];
            displayText = displayText.replace( match[0], str );
            removeExternalImagesPattern2.lastIndex = 0;
            count++;
        //}
    }

    return [ displayText, count ];
}
