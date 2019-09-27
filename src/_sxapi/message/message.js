
import ScalixMessageClass from "./constants"

class ScalixMessage {

    #data = {}

    constructor(data = {}) {
        this.#data = data
    }

    get messageClass() {
        return this.#data['type']
    }

    static fromJson(data) {
        return fromJsonObject(data);
    }

    get uid() {
        return this.#data['uid']
    }

    get subject() {
        return this.#data['subject']
    }

    get from() {
        return this.#data['from']
    }

    get directRef() {
        return this.#data['dref']
    }

    get folderDirectRef() {
        return this.#data['parent']
    }

    get unread() {
        return !this.#data['seen']
    }
}

class ScalixMapiXml extends ScalixMessage {

    constructor(data = {}) {
        super(data)
    }

    fromXml() {

    }
}


class CalendaringObject extends ScalixMapiXml {
    constructor(data = {}) {
        super(data)
    }

    fromICal() {

    }
}

class ContactObject extends ScalixMapiXml {

    constructor(data = {}) {
        super(data)
    }

    fromVCard() {

    }
}

class Note extends ScalixMessage {
    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.NOTE;
    }
}

class Appointment extends CalendaringObject {
    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.APPOINTMENT;
    }
}

class MeetingRequest extends CalendaringObject {
    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.MEETING_REQUEST;
    }
}

class MeetingResponsePositive extends CalendaringObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.MEETING_RESPONSE_ACCEPT;
    }
}

class MeetingResponseNegative extends CalendaringObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.MEETING_RESPONSE_DECLINE;
    }
}

class MeetingResponseTentative extends CalendaringObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.MEETING_RESPONSE_TENTATIVE;
    }
}

class MeetingCancellation extends CalendaringObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.MEETING_CANCELED;
    }
}

class Contact extends ContactObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.CONTACT;
    }
}

class Post extends ScalixMessage {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.POST;
    }
}

class Task extends CalendaringObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.TASK;
    }
}

class DistributionList extends ContactObject {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.DISTRIBUTION_LIST;
    }
}

class DeliveryFailure extends ScalixMessage {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.DELIVERY_FAILURE;
    }
}

class DeliveryReceipt extends ScalixMessage {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.DELIVERY_RECEIPT;
    }
}

class ReadReceipt extends ScalixMessage {

    constructor(data = {}) {
        super(data)
    }

    get messageClass() {
        return ScalixMessageClass.READ_RECEIPT;
    }
}

function fromJsonObject(data = {}) {
    if (!data) {
        return new ScalixMessage(data)
    }
    switch (Symbol.for(data['type'])) {
        case ScalixMessageClass.NOTE: {
            return new Note(data);
        }
        case ScalixMessageClass.APPOINTMENT: {
            return new Appointment(data);
        }
        case ScalixMessageClass.MEETING_REQUEST: {
            return new MeetingRequest(data);
        }
        case ScalixMessageClass.MEETING_RESPONSE_ACCEPT: {
            return new MeetingResponsePositive(data);
        }
        case ScalixMessageClass.MEETING_RESPONSE_DECLINE: {
            return new MeetingResponseNegative(data);
        }
        case ScalixMessageClass.MEETING_RESPONSE_TENTATIVE: {
            return new ScalixMessageClass.MeetingResponseTentative(data);
        }
        case ScalixMessageClass.MEETING_CANCELED: {
            return new MeetingCancellation(data);
        }
        case ScalixMessageClass.CONTACT: {
            return new Contact(data);
        }
        case ScalixMessageClass.POST: {
            return new Post(data);
        }
        case ScalixMessageClass.TASK: {
            return new Task(data);
        }
        case ScalixMessageClass.DISTRIBUTION_LIST: {
            return new DistributionList(data);
        }
        case ScalixMessageClass.DELIVERY_FAILURE: {
            return new DeliveryFailure(data);
        }
        case ScalixMessageClass.DELIVERY_RECEIPT: {
            return new DeliveryReceipt(data);
        }
        case ScalixMessageClass.READ_RECEIPT: {
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
}