import { defineStore } from "pinia";
import { ref } from "vue";


export const useUiStore = defineStore('uiStore', () => {
    const loading = ref(false)
    const error = ref('')

    const setError = (msg) => {
        error.value = msg
        setTimeout(() => {
            error.value = ''
        }, 3000)
    }

    const setLoading = (val) => {
        loading.value = val
    }

    return { loading, error, setError, setLoading }
})