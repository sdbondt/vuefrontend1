import Posts from '../views/Posts.vue'
import Auth from '../views/Auth.vue'
import Post from '../views/Post.vue'
import PageNotFound from '../views/PageNotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: 'posts'
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        meta: {
            title: 'Signup or Login'
        }
    }, {
        path: '/:catchAll(.*)*',
        name: '404',
        component: PageNotFound,
        meta: {
            title: 'Page not found'
        }
    },
    {
        path: '/posts',
        name: 'posts',
        component: Posts,
        meta: {
            title: 'Posts'
        }
    },
    {
        path: '/posts/:postId',
        name: 'post',
        component: Post,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, __, next) => {
    const authStore = useAuthStore()
    const { isLoggedIn } = authStore
    document.title = to.meta.title || 'App'
    if (to.path !== '/auth' && !isLoggedIn.value) {
        next('/auth')
    }
    else {
        next()
    } 
})

export default router