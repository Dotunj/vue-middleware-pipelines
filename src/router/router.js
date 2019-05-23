import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Movies from '../components/Movies'

import guest from './middleware/guest'
import auth from './middleware/auth'
import isSubscribed from './middleware/isSubscribed'
import middlewarePipeline from './middlewarePipeline'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                middleware: [
                    guest
                ]
            }
        },

        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                middleware: [
                    auth
                ]
            },
            children: [{
                path: '/dashboard/movies',
                name: 'dashboard.movies',
                component: Movies,
                meta: {
                    middleware: [
                        auth,
                        isSubscribed
                    ]
                }
            }],
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }


    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })

})



export default router