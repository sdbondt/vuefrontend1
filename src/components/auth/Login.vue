<script setup>
import Button from '../ui/Button.vue';
import { reactive } from 'vue';
import { useAuthStore } from '../../store/authStore';

const loginData = reactive({
    email: '',
    password: '',
    rememberEmail: false
})

const authStore = useAuthStore()
const { login } = authStore

const storedEmail = localStorage.getItem('loginEmail')
if (storedEmail) {
    loginData.email = storedEmail
    loginData.rememberEmail = true
}

const handleSubmit = async () => {
    await login(loginData)
}
</script>

<template>
    <div class="flex flex-col justify-center px-4 py-2 m-2 bg-blue-200 border rounded-md shadow-md mx-auto w-[300px] h-[400px]">
        <h3 class="text-xl font-semibold m-4">Login</h3>
        <form @submit.prevent="handleSubmit" class="flex flex-col items-center space-y-2">
            <input class="custom-input" type="email" v-model="loginData.email" placeholder="enter your email here"  />
            <input class="custom-input" type="password" v-model="loginData.password" placeholder="password" />
            <input id="rememberEmail"  class="h-4 w-4 mr-2 text-blue-600" type="checkbox" v-model="loginData.rememberEmail" />
            <label class="text-sm text-gray-700" for="rememberEmail" >Remember Email</label>
            <Button>Login</Button>
        </form>
    </div>
</template>