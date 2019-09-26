
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
}

class ScalixMapiXml extends ScalixMessage {

    fromXml() {

    }
}


class CalendaringObject extends ScalixMapiXml {
    fromICal() {

    }
}

class ContactObject extends ScalixMapiXml {
    fromVCard() {

    }
}

class Note extends ScalixMessage {
    get messageClass() {
        return ScalixMessageClass.NOTE;
    }
}

class Appointment extends CalendaringObject {
    get messageClass() {
        return ScalixMessageClass.APPOINTMENT;
    }
}

class MeetingRequest extends CalendaringObject {
    get messageClass() {
        return ScalixMessageClass.MEETING_REQUEST;
    }
}

class MeetingResponsePositive extends CalendaringObject {
    get messageClass() {
        return ScalixMessageClass.MEETING_RESPONSE_ACCEPT;
    }
}

class MeetingResponseNegative extends CalendaringObject {
    get messageClass() {
        return ScalixMessageClass.MEETING_RESPONSE_DECLINE;
    }
}

class MeetingResponseTentative extends CalendaringObject {
    get messageClass() {
        return ScalixMessageClass.MEETING_RESPONSE_TENTATIVE;
    }
}

class MeetingCancellation extends CalendaringObject {
    get messageClass() {
        return ScalixMessageClass.MEETING_CANCELED;
    }
}

class Contact extends ContactObject {
    get messageClass() {
        return ScalixMessageClass.CONTACT;
    }
}

class Post extends ScalixMessage {
    get messageClass() {
        return ScalixMessageClass.POST;
    }
}

class Task extends CalendaringObject {
    get messageClass() {
        return ScalixMessageClass.TASK;
    }
}

class DistributionList extends ContactObject {
    get messageClass() {
        return ScalixMessageClass.DISTRIBUTION_LIST;
    }
}

class DeliveryFailure extends ScalixMessage {
    get messageClass() {
        return ScalixMessageClass.DELIVERY_FAILURE;
    }
}

class DeliveryReceipt extends ScalixMessage {
    get messageClass() {
        return ScalixMessageClass.DELIVERY_RECEIPT;
    }
}

class ReadReceipt extends ScalixMessage {
    get messageClass() {
        return ScalixMessageClass.READ_RECEIPT;
    }
}

function fromJsonObject(data = {}) {
    if (!data) {
        return new ScalixMessage(data)
    }
    switch (data['type']) {
        case ScalixMessageClass.ScalixMessageClass.NOTE: {
            return new Note(data);
        }
        case ScalixMessageClass.APPOINTMENT: {
            return new Appointment();
        }
        case ScalixMessageClass.MEETING_REQUEST: {
            return new MeetingRequest();
        }
        case ScalixMessageClass.MEETING_RESPONSE_ACCEPT: {
            return new MeetingResponsePositive();
        }
        case ScalixMessageClass.MEETING_RESPONSE_DECLINE: {
            return new MeetingResponseNegative();
        }
        case ScalixMessageClass.MEETING_RESPONSE_TENTATIVE: {
            return new ScalixMessageClass.MeetingResponseTentative();
        }
        case ScalixMessageClass.MEETING_CANCELED: {
            return new MeetingCancellation();
        }
        case ScalixMessageClass.CONTACT: {
            return new Contact();
        }
        case ScalixMessageClass.POST: {
            return new Post();
        }
        case ScalixMessageClass.TASK: {
            return new Task();
        }
        case ScalixMessageClass.DISTRIBUTION_LIST: {
            return new DistributionList();
        }
        case ScalixMessageClass.DELIVERY_FAILURE: {
            return new DeliveryFailure();
        }
        case ScalixMessageClass.DELIVERY_RECEIPT: {
            return new DeliveryReceipt();
        }
        case ScalixMessageClass.READ_RECEIPT: {
            return new ReadReceipt();
        }
        default: {
            return new Note();
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