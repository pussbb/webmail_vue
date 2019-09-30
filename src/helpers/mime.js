
import {quotedPrintableDecode, base64Decode, mimeWordsDecode} from "emailjs-mime-codec"
import {imapDecode } from 'emailjs-utf7'


export function decodePartBody(part) {

    if (!part) {
        return null;
    }
    const {enc='', charset='UTF-8', body=''} = part
    switch(enc) {
        case 'quoted-printable': {
            return quotedPrintableDecode(body, charset)
        }
        case '7bit': {
            return imapDecode(body)
        }
        case "base64": {
            return base64Decode(body, charset)
        }
        default:
            return mimeWordsDecode(body);
    }
}