
import axios from "axios"
import {UserInfo} from "@/_sxapi/UserInfo";
import {ScalixFolder} from "@/_sxapi/Folder";

export default class ClientConnection {

    #userinfo = null;

    constructor({baseURL = ''} = {}) {
        this._newInstance(baseURL)
    }

    _newInstance(baseURL) {
        this._instance = axios.create({
            baseURL,
            withCredentials: true,
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
}