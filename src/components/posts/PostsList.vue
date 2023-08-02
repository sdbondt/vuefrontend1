<script setup>
import PostItem from './PostItem.vue';
const { posts } = defineProps(['posts'])
</script>

<template>
    <div class="px-4 py-2 m-2 bg-blue-200 border rounded-md shadow-md mx-auto w-1/3" v-for="post in posts" :key="post.id">
        <PostItem :post="post" />
    </div>
</template>