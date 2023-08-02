const envs = import.meta.env

import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import jwt_decode from 'jwt-decode';

import { storeMethodHandler } from "../utils/storeMethodHandler";
import { useRouter } from "vue-router";

const authURL = envs.VITE_API_URL + 'auth/'


export const useAuthStore = defineStore('auth', () => {
    const token = ref('')
    const userId = ref('')
    const isLoggedIn = computed(() => Boolean(token.value))
    const router = useRouter()

    const logout = () => {
        token.value = ''
        localStorage.removeItem('authToken')
        router.push('/auth')
    }

    const setUserId = (authToken) => {
        const payload = jwt_decode(authToken)
        const isTokenExpired = Date.now() >= payload.exp * 1000
        if (isTokenExpired) {
            logout()
        } else {
            userId.value = payload.userId
        }
    }

    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
        token.value = storedToken
        setUserId(storedToken)
    }

    const login = async (loginData) => {
        storeMethodHandler(async () => {
            const res = await axios.post(authURL + 'login', loginData)
            const { token: authToken } = res.data
            token.value = authToken
            localStorage.setItem('authToken', authToken)
            setUserId(authToken)
            if (loginData.rememberEmail) {
                localStorage.setItem('loginEmail', loginData.email)
            } else {
                localStorage.removeItem('loginEmail')
            }
            router.push('/posts')
        }) 
    }

    const signup = async (signupData) => {
        storeMethodHandler(async () => {
            const res = await axios.post(authURL + 'signup', signupData)
            const { token: authToken } = res.data
            token.value = authToken
            localStorage.setItem('authToken', authToken)
            setUserId(authToken)
            router.push('/posts')
        })    
    }
    return { token, isLoggedIn, userId, signup, login, logout}
})