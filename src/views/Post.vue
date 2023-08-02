<script setup>
import AuthorForm from '../components/posts/AuthorForm.vue';
import Comments from '../components/comments/Comments.vue';
import { computed, onBeforeMount, watch } from 'vue';
import { usePostsStore } from '../store/postsStore';
import { useUiStore } from '../store/uiStore'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import LikeBar from '../components/likes/LikeBar.vue';
import { useLikeStore } from '../store/likeStore';

const postsStore = usePostsStore()
const authStore = useAuthStore()
const likesStore = useLikeStore()
const uiStore = useUiStore()

const { userId } = storeToRefs(authStore)
const { post } = storeToRefs(postsStore)
const { fetchPost } = postsStore
const { loading, error } = storeToRefs(uiStore)
const { likeDocument } = likesStore

const route = useRoute()
const postId = computed(() => route.params.postId)
const isAuthor = computed(() => post.value.user && post.value.user._id ? post.value.user._id == userId.value : false)
const isLiked = computed(() => post.value.likes.some((el) => el.user == userId.value))
const likeButtonValue = computed(() => isLiked.value ? 'Unlike' : 'Like')
const likePostSegment = computed(() => `posts/${postId.value}`)

const handleLike = async () => {
    await likeDocument(likePostSegment.value)
}

onBeforeMount(async () => {
    await fetchPost(postId.value)
    document.title = post.value.title
})

watch(postId, async () => {
    await fetchPost(postId.value)
})
</script>

<template>
    <p v-if="loading">loading...</p>
    <div class="mx-auto w-1/3" v-else>
        <p v-if="error">{{ error }}</p>
        <h2 class="p-2 m-2 text-3xl font-bold underline decoration-wavy hover:decoration-solid">{{ post.title }} <span class="italic text-sm">({{ post.user.name }})</span> </h2>
        <p class="p-4 m-2 border border-blue-500 rounded-md shadow-lg shadow-blue-500/50">{{ post.content }}</p>
        <LikeBar :length="post.likes.length" :button-value="likeButtonValue" @like="handleLike"/>
        <AuthorForm v-if="isAuthor" :post="post" />
        <Comments />
    </div>
</template>