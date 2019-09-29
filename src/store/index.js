import Vue from 'vue'
import Vuex from 'vuex'

import account from "./modules/account";
import mailbox from "./modules/mailbox";
import notification from "./modules/notification";

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        account,
        mailbox,
        notification
    },
    strict: debug,
    plugins: []
});

[notification].forEach((module) => {
    if (module.watchers){
        module.watchers.forEach((params) => {
            store.watch(...params)
        })
    }
});

export default store