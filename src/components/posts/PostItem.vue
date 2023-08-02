<script setup>
const { post } = defineProps(['post'])
</script>

<template>
    <h3 class="px-4 py-2 m-2">{{ post.title }}</h3>
    <router-link class="bg-blue-500 px-4 py-2 m-2 shadow-lg border-blue-800 inline-block w-auto rounded-md hover:bg-blue-600"
        :to="{ name: 'post', params: { postId: post._id}}">See post</router-link>
</template>