import Vue from 'vue'
import Router from 'vue-router'


import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import CalendarPage from './components/CalendarPage'
import TasksPage from "./components/TasksPage"
import PeoplePage from "./components/PeoplePage"
import ProfilePage from "./components/ProfilePage"
import AboutPage from "./components/AboutPage"

import store from "@/store";
import axios from "axios"

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/mailbox/:folderdref?/:msgdref?',
            name: 'mail',
            alias: '/',
            component: MainPage,
            //meta: { authorize: [] }
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/calendar/:folderdref?/:msgdref?',
            name: 'calendar',
            component: CalendarPage
        },
        {
            path: '/tasks/:folderdref?/:msgdref?',
            name: 'tasks',
            component: TasksPage
        },
        {
            path: '/people/:folderdref?/:msgdref?',
            name: 'people',
            component: PeoplePage
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage
        },
        {
            path: '/about',
            name: 'about',
            component: AboutPage
        },


        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (401 === error.response.status) {
        store.dispatch(["account/logout"]);
        return router.push('/login');
    }
    return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page

    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.getters["account/isLoggedIn"];

    if (authRequired && !loggedIn) {
        return next({ path: '/login', query: { returnUrl: to.path } });
    } else if (to.path === '/login' && loggedIn) {
        return next(from);
    }
    next();
})