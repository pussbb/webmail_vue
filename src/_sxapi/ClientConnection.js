
import axios from "axios"
import {UserInfo} from "./UserInfo";
import {ScalixFolder} from "./Folder";
import {Message} from "./message"

export default class ClientConnection {

    #userinfo = null;

    constructor({baseURL = ''} = {}) {
        this._newInstance(baseURL)
    }

    _newInstance(baseURL) {
        this._instance = axios.create({
            baseURL,
            //proxy: false
        });
    }

    login(username, password) {
        this._instance.defaults.auth = { username, password };
        return new Promise((resolve, reject) => {
            this._instance
                .get('userinfo?output=json')
                .then(resp => {
                    this.#userinfo = new UserInfo(resp.data);
                    return resolve(this.#userinfo);
                })
                .catch(err => reject(err))
        });
    }

    logout() {
        this._newInstance(this._instance.baseURL);
    }

    get userInfo() {
        return this.#userinfo;
    }

    get folders() {
        return new Promise((resolve, reject) => {
            const config = {
                params: {'output': 'json', 'treeview': 'true'}
            }
            this._instance
                .get(this.#userinfo.mailboxUri, config)
                .then(resp => {
                    const revision = resp.data.revision
                    const folders = resp.data.folders.map((i) =>  new ScalixFolder(i))
                    resolve({ revision, folders });
                })
                .catch(err => reject(err));
        });
    }

    _folder_url(folder) {
        return `${this.#userinfo.mailboxUri}/${(folder instanceof ScalixFolder) ? folder.directRef : folder}`
    }
    // eslint-disable-next-line no-unused-vars
    folderEmails(folder, from=0, to=50) {
        const url = this._folder_url(folder);
        const config = {
            params: {
                'output': 'json',
                'sort': 'date',
                'sort-direction': 'desc',
                'start': from,
                'end': to
            }
        }
        return new Promise((resolve, reject) => {
            this._instance
                .get(url, config)
                .then(resp => {
                    resolve(resp.data.map((i) =>  {
                        return Message.ScalixMessage.fromJson(i)
                    }));
                })
                .catch(err => reject(err));
        });
    }

    fetchFolderEmail(folder, msgDref) {
        const url = this._folder_url(folder);
        const config = {
            params: {
                'output': 'json',
                'detail': 'text',
                'drefs': msgDref
            }
        }
        return new Promise((resolve, reject) => {
            this._instance
                .get(url, config)
                .then(resp => {
                    resolve(resp.data.map((i) =>  {
                        return Message.ScalixMessage.fromJson(i)
                    }));
                })
                .catch(err => reject(err));
        });
    }
}