
/*
{
  "smtpaddress": "abr@scalix.com",
  "displayname": "Alexey Bobyr",
  "userclass": "Full",
  "mailbox": "/abr@scalix.com/mailbox",
  "authid": "abr@scalix.com",
  "isasuser": true,
  "senderia": [
    "Alexey Bobyr <abr@scalix.com>",
    "Alexey Bobyr <abr@securim.io>",
    "Alexey Bobyr <abr@securim.tech>"
  ]
}
 */

export const UserClass = Object.freeze({
    Full:   Symbol("Full"),
    Limited:  Symbol("Limited")
});


export class UserInfo {

    #data = {}

    constructor(data={}) {
        this.#data = data
    }

    get smtpAddress() {
        return this.#data["smtpaddress"];
    }

    get senderInternetAdresses() {
        return this.#data["senderia"];
    }

    get displayName() {
        return this.#data["displayname"];
    }

    get userClass() {
        return UserClass[this.#data["userclass"]]
    }

    get mailboxUri() {
        return this.#data["mailbox"]
    }

    get isActiveSyncUser() {
        return this.#data["isasuser"] === true;
    }
}