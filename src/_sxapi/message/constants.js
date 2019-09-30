
const MessageImportanceEnum = Object.freeze({
    LOW    : Symbol.for("low"),
    MEDIUM : Symbol.for("medium"),
    HIGH   : Symbol.for("high"),
});

const  MessageSensitivityEnum = Object.freeze({
    NORMAL       : Symbol.for("Normal"),
    PERSONAL     : Symbol.for("Personal"),
    PRIVATE      : Symbol.for("Private"),
    CONFIDENTIAL : Symbol.for("Company-Confidential"),
});

const  MessageFlagEnum = Object.freeze({
    NONE      : 0,
    ANSWERED  : 8,
    DELETED   : 1,
    DRAFT     : 128,
    FLAGGED   : 4,
    RECENT    : 0x00010000,
    SEEN      : 2,
    ATTACH    : 16,
    FORWARDED : 256,
    XOWNER    : 512,
    XPROCESSED: 65536,
    JUNK      : 32,
    NONJUNK   : 64,
    MDNSENT   : 1024,
    LABEL1: 2048,
    LABEL2: 4096,
    LABEL3: 8192,
    LABEL4: 16384,
    LABEL5: 32768
});

const  AddressTypeEnum = Object.freeze({
    OPENMAIL : Symbol.for("OPENMAIL"),
    SMTP 	 : Symbol.for("SMTP"),
    MAPIPDL  : Symbol.for("MAPIPDL"),
});

const ScalixMessageClass = Object.freeze({
// E-mail messages
        NOTE: Symbol.for("IPM.Note"),

        /**
         * The Note imc notif.
         */
// 	Reports from the Internet Mail Connect (the Exchange Server gateway to the Internet)
        NOTE_IMC_NOTIF: Symbol.for("IPM.Note.IMC.Notification"),

    /**
     * The Out off office.
     */
// Out-of-office templates
    OUT_OFF_OFFICE: Symbol.for("IPM.Note.Rules.Oof.Template.Microsoft"),

    /**
     * The Secure note.
     */
// Encrypted notes to other people
    SECURE_NOTE: Symbol.for("IPM.Note.Secure"),

    /**
     * The Secure sign note.
     */
// Digitally signed notes to other people
    SECURE_SIGN_NOTE: Symbol.for("IPM.Note.Secure.Sign"),

    /**
     * The Post.
     */
// Posting notes in a folder
    POST: Symbol.for("IPM.Post"),

    /**
     * The Sticky note.
     */
//	Creating notes
    STICKY_NOTE: Symbol.for("IPM.StickyNote"),

    /**
     * The Recall report.
     */
// Message recall reports
    RECALL_REPORT: Symbol.for("IPM.Recall.Report"),

    /**
     * The Outlook recall.
     */
// Recalling sent messages from recipient Inboxes
    OUTLOOK_RECALL: Symbol.for("IPM.Outlook.Recall"),

    /**
     * The Remote.
     */
// Remote Mail message headers
    REMOTE: Symbol.for("IPM.Remote"),

    /**
     * The Resend.
     */
// 	Resending a failed message
    RESEND: Symbol.for("IPM.Resend"),

    /**
     * Task scalix message class.
     */
// Tasks
    TASK: Symbol.for("IPM.Task"),

    /**
     * The Task request accepted.
     */
// Responses to accept task requests
    TASK_REQUEST_ACCEPTED: Symbol.for("IPM.TaskRequest.Accept"),

    /**
     * The Task request declined.
     */
//	Responses to desline task requests
    TASK_REQUEST_DECLINED: Symbol.for("IPM.TaskRequest.Decline"),

    /**
     * The Task request.
     */
// 	Task requests
    TASK_REQUEST: Symbol.for("IPM.TaskRequest"),

    /**
     * The Task request update.
     */
// 	Updates to requested tasks
    TASK_REQUEST_UPDATE: Symbol.for("IPM.TaskRequest.Update"),

    /**
     * Message scalix message class.
     */
    MESSAGE: Symbol.for("IPM.Message"),

    /**
     * Appointment scalix message class.
     */
// Appointments
    APPOINTMENT: Symbol.for("IPM.Appointment"),

    /**
     * The Ole class.
     */
// The exception item of a recurrence series
    OLE_CLASS: Symbol.for("IPM.OLE.Class"),
    /**
     * Recurrence exception scalix message class.
     */
    RECURRENCE_EXCEPTION: Symbol.for("IPM.RecurrenceException"),

    /**
     * The Meeting request.
     */
// Meeting requests
    MEETING_REQUEST: Symbol.for("IPM.Schedule.Meeting.Request"),

    /**
     * The Meeting response accept.
     */
// Responses to accept meeting requests
    MEETING_RESPONSE_ACCEPT: Symbol.for("IPM.Schedule.Meeting.Resp.Pos"),

    /**
     * The Meeting response decline.
     */
// Responses to decline meeting requests
    MEETING_RESPONSE_DECLINE: Symbol.for("IPM.Schedule.Meeting.Resp.Neg"),

    /**
     * The Meeting response tentative.
     */
// Responses to tentatively accept meeting requests
    MEETING_RESPONSE_TENTATIVE: Symbol.for("IPM.Schedule.Meeting.Resp.Tent"),

    /**
     * The Meeting canceled.
     */
// Meeting cancellations
    MEETING_CANCELED: Symbol.for("IPM.Schedule.Meeting.Canceled"),

    /**
     * The Distribution list.
     */
// Distribution lists
    DISTRIBUTION_LIST: Symbol.for("IPM.DistList"),

    /**
     * Contact scalix message class.
     */
// Contacts
    CONTACT: Symbol.for("IPM.Contact"),

    /**
     * Delivery failure scalix message class.
     */
    DELIVERY_FAILURE: Symbol.for("IPM.DeliveryFailure"),
    /**
     * Delivery receipt scalix message class.
     */
    DELIVERY_RECEIPT: Symbol.for("IPM.DeliveryReceipt"),
    /**
     * Read receipt scalix message class.
     */
    READ_RECEIPT: Symbol.for("IPM.ReadReceipt"),

    /**
     * The Journal.
     */
// Journal entries
    JOURNAL: Symbol.for("IPM.Activity"),

    /**
     * Document scalix message class.
     */
// Documents
    DOCUMENT: Symbol.for("IPM.Document")

});

export default {
    ScalixMessageClass,
    AddressTypeEnum,
    MessageFlagEnum,
    MessageSensitivityEnum,
    MessageImportanceEnum
}