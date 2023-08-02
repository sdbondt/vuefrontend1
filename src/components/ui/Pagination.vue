<script setup>
import Button from './Button.vue'
import { ref } from 'vue';

const props = defineProps(['page', 'maxPage', 'totalCount', 'setPage'])
const { setPage } = props
const searchPage = ref(null)

const toFirstPage = () => setPage(1)

const toPreviousPage = () => setPage(props.page - 1)

const toNextPage = () => setPage(props.page + 1)

const toLastPage = () => setPage(props.maxPage)

const goToPage = () => setPage(searchPage.value)
</script>

<template>
    <div class="flex flex-wrap items-center space-x-4 mb-4">
        <div class="flex items-center space-x-4 mb-2">
            <p>{{ props.totalCount }} {{ props.totalCount == 1 ? 'result': 'results' }} (<span>page: {{ props.page }}</span>)</p>
        </div>
        <div class="flex items-center space-x-4 mb-2">
            <input class="px-4 py-2 bg-blue-500 text-white font-semibold rounded disabled:opacity-50" type="button" value="1" :disabled="props.page == 1" @click="toFirstPage" />
            <input class="px-4 py-2 bg-blue-500 text-white font-semibold rounded disabled:opacity-50" type="button" value="-" :disabled="props.page == 1" @click="toPreviousPage" />
            <input class="px-4 py-2 bg-blue-500 text-white font-semibold rounded disabled:opacity-50" type="button" value="+" :disabled="props.page == props.maxPage" @click="toNextPage" />
            <input class="px-4 py-2 bg-blue-500 text-white font-semibold rounded disabled:opacity-50"  type="button" :value="props.maxPage" :disabled="props.page == props.maxPage" @click="toLastPage" />
        </div>
        <form @submit.prevent="goToPage">
            <input type="number" v-model="searchPage" placeholder="Go to page..." min="1" :max="props.maxPage" />
            <Button>Search</Button>
        </form>
    </div>
</template>