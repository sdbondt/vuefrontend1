<script setup>
import Button from './Button.vue';
import { useAuthStore } from '../../store/authStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore()
const { logout } = authStore
const { isLoggedIn } = storeToRefs(authStore)

const handleLogout = () => {
    logout()
}
</script>

<template>
    <div class="flex justify-between items-center bg-blue-600 p-4">
        <h2 class="text-2xl font-bold">WEB SITE</h2>
        <Button v-if="isLoggedIn" @click="handleLogout">Logout</Button>
    </div>
</template>