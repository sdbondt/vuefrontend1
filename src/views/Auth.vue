<script setup>
import Button from '../components/ui/Button.vue';
import { computed, onMounted, ref, watch } from 'vue';
import Login from '../components/auth/Login.vue';
import Signup from '../components/auth/Signup.vue';
import { useUiStore } from '../store/uiStore';
import { storeToRefs } from 'pinia';

const uiStore = useUiStore()
const { loading, error } = storeToRefs(uiStore)

const showLogin = ref(true)
const selectedComponent = computed(() => showLogin.value ? Login : Signup)
const buttonValue = computed(() => showLogin.value ? 'Signup instead' : 'Login instead')
const switchComponent = () => showLogin.value = !showLogin.value

onMounted(() => {
    document.title = showLogin.value? 'Login': 'Signup'
})

watch(showLogin, (newValue) => {
  document.title = newValue ? 'Login' : 'Signup';
})
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
    <p v-if="loading">loading...</p>
    <div v-else class="text-center">
        <p v-if="error">{{ error }}</p>
        <KeepAlive>
            <component :is="selectedComponent" :key="selectedComponent" />
        </KeepAlive>
        <Button @click="switchComponent">{{ buttonValue }}</Button>   
    
        
    </div>
</div>
    
</template>