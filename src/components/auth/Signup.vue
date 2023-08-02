<script setup>
import Button from '../ui/Button.vue';
import { reactive } from 'vue';
import { useAuthStore } from '../../store/authStore'

const signupData = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
})

const authStore = useAuthStore()
const { signup } = authStore

const handleSubmit = async () => {
    await signup(signupData)
}
</script>
<template>
    <div class="flex flex-col justify-center px-4 py-2 m-2 bg-blue-200 border rounded-md shadow-md mx-auto w-[300px] h-[400px]">
        <h3 class="text-xl font-semibold m-4">Signup</h3>
        <form @submit.prevent="handleSubmit" class="flex flex-col items-center space-y-2">
            <input class="custom-input" type="email" v-model="signupData.email" placeholder="enter your email here"  />
            <input class="custom-input" type="text" v-model="signupData.name" placeholder="enter your username here" />
            <input class="custom-input" type="password" v-model="signupData.password" placeholder="enter your password here" />
            <input class="custom-input" type="password" v-model="signupData.confirmPassword" placeholder="confirm your password" />
            <Button class="block text-center">Signup</Button> 
        </form>
    </div>   
</template>