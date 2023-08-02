<script setup>
import { storeToRefs } from 'pinia';
import PostForm from '../components/posts/PostForm.vue';
import PostOptions from '../components/posts/PostOptions.vue'
import PostsList from '../components/posts/PostsList.vue';
import { usePostsStore } from '../store/postsStore';
import { onBeforeMount, watch } from 'vue';
import { useUiStore } from '../store/uiStore';

const postsStore = usePostsStore()
const uiStore = useUiStore()
const { fetchPosts } = postsStore
const { posts, queryString } = storeToRefs(postsStore)
const { loading, error } = storeToRefs(uiStore)

onBeforeMount(async () => {
    await fetchPosts()
})

watch(queryString, async () => {
    await fetchPosts()
})
</script>

<template>
    <p v-if="loading"> loading...</p>
    <div v-else>
        <p v-if="error">{{ error }}</p>
        <PostForm />
        <PostOptions />
        <PostsList :posts="posts" />
    </div>
</template>