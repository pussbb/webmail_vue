
import ScalixMessageClass from "./constants"
import vCard from "vcf"
import ICAL from "ical.js"

class ScalixMessage {

    _data = {}

    constructor(data = {}) {
        this._data = data
    }

    get messageClass() {
        return this._data['type']
    }

    static fromJson(data) {
        return fromJsonObject(data);
    }

    get uid() {
        return this._data['uid']
    }

    get subject() {
        return this._data['subject']
    }

    get from() {
        return this._data['from']
    }

    get to() {
        return this._data['to']
    }

    get bcc() {
        return this._data['bcc']
    }

    get cc() {
        return this._data['cc']
    }

    get directRef() {
        return this._data['dref']
    }

    get folderDirectRef() {
        return this._data['parent']
    }

    get parts() {
        return this._data['parts']
    }

    get received() {
        return this._data['received']
    }

    get unread() {
        return !this._data['seen']
    }
}

class ScalixMapiXml extends ScalixMessage {

    _xmlDoc = null

    constructor(data = {}) {
        super(data);
        this._fromXml(this._data['mapi_xml'])
    }

    _fromXml(xmlStr) {
        if (!xmlStr) {
            return;
        }
        if (window.DOMParser)
        {
            this._xmlDoc = new DOMParser().parseFromString(xmlStr, "text/xml");
        }
        else // Internet Explorer
        {
            this._xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            this._xmlDoc.async = false;
            this._xmlDoc.loadXML(xmlStr);
        }
    }
}


class CalendaringObject extends ScalixMapiXml {
    _ical = null
    constructor(data = {}) {
        super(data)
        this.fromICal(data['davBody'])
    }

    fromICal(icalData) {
        if (!icalData) {
            return;
        }
        this._ical =  new ICAL.Component(ICAL.parse(icalData));

    }
}

class ContactObject extends ScalixMapiXml {

    _vcard = null;

    constructor(data = {}) {
        super(data)
        this._fromVCard(this._data['davBody'])
    }

    _getVcardSimpleProperty(propName) {
        if (!this._vcard) {
            return null;
        }
        const prop = this._vcard.get(propName);
        return prop ? prop.valueOf() : null;
    }

    _fromVCard(vcardStr) {
        this._vcard = new vCard().parse( vcardStr )
    }
}

class Note extends ScalixMessage {
    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.NOTE;
    }
}

class Appointment extends CalendaringObject {
    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.APPOINTMENT;
    }
}

class MeetingRequest extends CalendaringObject {
    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.MEETING_REQUEST;
    }
}

class MeetingResponsePositive extends CalendaringObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.MEETING_RESPONSE_ACCEPT;
    }
}

class MeetingResponseNegative extends CalendaringObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.MEETING_RESPONSE_DECLINE;
    }
}

class MeetingResponseTentative extends CalendaringObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.MEETING_RESPONSE_TENTATIVE;
    }
}

class MeetingCancellation extends CalendaringObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.MEETING_CANCELED;
    }
}

class Contact extends ContactObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.CONTACT;
    }

    get formattedName() {
        const fn = this._getVcardSimpleProperty('fn');
        if (fn) {
            return fn;
        }
        return null;
    }

    get telephone() {
        const tel = this._getVcardSimpleProperty('tel');
        if (tel) {
            if (Array.isArray(tel)) {
                return tel.map( i => i.valueOf())
            }
            return [tel];
        }
        return null;
    }

    get emails() {
        const emails = this._getVcardSimpleProperty('email');
        if (emails) {
            if (Array.isArray(emails)) {
                return emails.map( i => i.valueOf())
            }
            return [emails];
        }
        return null;
    }


    get organization() {
        return this._getVcardSimpleProperty('org');
    }
}

class Post extends ScalixMessage {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.POST;
    }
}

class Task extends CalendaringObject {

    _vtodo = null;

    constructor(data = {}) {
        super(data);
        if (this._ical) {
            this._vtodo = this._ical.getFirstSubcomponent('vtodo')
        }
    }

    _vtodoItem(item) {
        if (!this._vtodo) {
            return null;
        }
        return this._vtodo.getFirstPropertyValue(item);
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.TASK;
    }

    get description() {
        return this._vtodoItem('description')
    }

    get title() {
        return this._vtodoItem('summary')
    }

    get percents() {
        return this._vtodoItem('percent-complete') || 0
    }
    get isCompleted() {
        return this._vtodoItem('completed') != null;
    }
}

class DistributionList extends ContactObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.DISTRIBUTION_LIST;
    }
}

class DeliveryFailure extends ScalixMessage {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.DELIVERY_FAILURE;
    }
}

class DeliveryReceipt extends ScalixMessage {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.DELIVERY_RECEIPT;
    }
}

class ReadReceipt extends ScalixMessage {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.ScalixMessageClass.READ_RECEIPT;
    }
}

function fromJsonObject(data = {}) {
    if (!data) {
        return new ScalixMessage(data)
    }
    switch (Symbol.for(data['type'])) {
        case ScalixMessageClass.ScalixMessageClass.NOTE: {
            return new Note(data);
        }
        case ScalixMessageClass.ScalixMessageClass.APPOINTMENT: {
            return new Appointment(data);
        }
        case ScalixMessageClass.ScalixMessageClass.MEETING_REQUEST: {
            return new MeetingRequest(data);
        }
        case ScalixMessageClass.ScalixMessageClass.MEETING_RESPONSE_ACCEPT: {
            return new MeetingResponsePositive(data);
        }
        case ScalixMessageClass.ScalixMessageClass.MEETING_RESPONSE_DECLINE: {
            return new MeetingResponseNegative(data);
        }
        case ScalixMessageClass.ScalixMessageClass.MEETING_RESPONSE_TENTATIVE: {
            return new ScalixMessageClass.ScalixMessageClass.MeetingResponseTentative(data);
        }
        case ScalixMessageClass.ScalixMessageClass.MEETING_CANCELED: {
            return new MeetingCancellation(data);
        }
        case ScalixMessageClass.ScalixMessageClass.CONTACT: {
            return new Contact(data);
        }
        case ScalixMessageClass.ScalixMessageClass.POST: {
            return new Post(data);
        }
        case ScalixMessageClass.ScalixMessageClass.TASK: {
            return new Task(data);
        }
        case ScalixMessageClass.ScalixMessageClass.DISTRIBUTION_LIST: {
            return new DistributionList(data);
        }
        case ScalixMessageClass.ScalixMessageClass.DELIVERY_FAILURE: {
            return new DeliveryFailure(data);
        }
        case ScalixMessageClass.ScalixMessageClass.DELIVERY_RECEIPT: {
            return new DeliveryReceipt(data);
        }
        case ScalixMessageClass.ScalixMessageClass.READ_RECEIPT: {
            return new ReadReceipt(data);
        }
        default: {
            return new Note(data);
        }
    }
}

export default {
    ScalixMessage,
    Note,
    Appointment,
    ReadReceipt,
    DeliveryReceipt,
    DeliveryFailure,
    DistributionList,
    Task,
    Post,
    Contact,
    MeetingCancellation,
    MeetingResponseTentative,
    MeetingResponseNegative,
    MeetingResponsePositive,
    MeetingRequest,
    ContactObject
}