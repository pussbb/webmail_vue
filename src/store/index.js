import Vue from 'vue'
import Vuex from 'vuex'

import account from "./modules/account";
import mailbox from "./modules/mailbox";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        account,
        mailbox
    },
    strict: false,
    plugins: []
})