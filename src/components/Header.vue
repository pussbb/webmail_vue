<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="danger">
            <b-navbar-brand href="#" v-if="currentTab">
                <font-awesome-icon :icon="currentTab.icon" />
                {{ currentTab.title }}
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item v-for="(tab, index) in tabs" :key="index" v-show="tab !== currentTab" :to="tab.path">
                        <font-awesome-icon :icon="tab.icon" />
                        {{ tab.title }}
                    </b-nav-item>

                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search(Coming soon)"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" disabled type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown hidden text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <font-awesome-icon :icon="faUserCog" />&nbsp;<em>{{ userInfo.displayName }}</em>
                        </template>
                        <b-dropdown-item to="/profile"> <font-awesome-icon :icon="faUserCog" /> Profile</b-dropdown-item>
                        <b-dropdown-item href="#" v-on:click="logout"><font-awesome-icon :icon="faSignOutAlt" />Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item right to="/about">About</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"

    import { faUserCog, faSignOutAlt , faMailBulk, faCalendar, faTasks, faPeopleCarry } from '@fortawesome/free-solid-svg-icons'
    export default {
        props: ['tabName'],
        data () {
            return {
                faUserCog,
                faSignOutAlt,
                tabs : {
                    'mail': {
                        icon: faMailBulk,
                        title: 'Mail',
                        path: '/'
                    },
                    'calendar': {
                        icon: faCalendar,
                        title: 'Calendar',
                        path:  '/calendar'
                    },
                    'tasks': {
                        icon: faTasks,
                        title: 'Tasks',
                        path: '/tasks'
                    },
                    'people': {
                        icon: faPeopleCarry,
                        title: 'Contacts',
                        path: '/people'
                    }
                }
            }
        },
        computed: {
            ...mapGetters('account', ['userInfo']),
            currentTab() {
                return this.tabs[this.tabName]
            }
        },
        methods: {
            logout : function(e) {
                e.preventDefault();
                this.$store.dispatch('account/logout');
                this.$router.push('/login');
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
