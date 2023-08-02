<script setup>
import Pagination from '../ui/Pagination.vue'
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../../store/postsStore';

const postsStore = usePostsStore()
const { updateParams, setPage } = postsStore
const { searchParams, maxPage, totalCount } = storeToRefs(postsStore)

const handleParamsChange = (e) => {
    const { name, value } = e.target
    updateParams(name, value)
}

</script>

<template>
    <div class="px-4 py-2 m-2 bg-blue-200 border rounded-md shadow-md mx-auto w-1/3">
        <input class="custom-input" name="q" type="text" placeholder="search for posts" :value="searchParams.q" @change="handleParamsChange" />
        <Pagination :page="searchParams.page" :maxPage="maxPage" :totalCount="totalCount" :setPage="setPage" />
        <select class="custom-select" name="limit" :value="searchParams.limit" @change="handleParamsChange">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
        <select class="custom-select" name="direction" :value="searchParams.direction" @change="handleParamsChange">
            <option value="desc">desc</option>
            <option value="asc">asc</option>
        </select>
        <select class="custom-select" name="sortBy" :value="searchParams.sortBy" @change="handleParamsChange"> 
            <option value="title">title</option>
            <option value="date">date</option>
        </select> 
    </div>
</template>