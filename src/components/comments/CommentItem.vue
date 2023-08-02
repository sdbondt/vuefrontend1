<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../store/authStore';
import { storeToRefs } from 'pinia';
import AuthorForm from './AuthorForm.vue';
import LikeBar from '../likes/LikeBar.vue';
import { useLikeStore } from '../../store/likeStore';

const { comment } = defineProps(['comment'])
const authStore = useAuthStore()
const likesStore = useLikeStore()
const { userId } = storeToRefs(authStore)
const { likeDocument } = likesStore

const isAuthor = computed(() => comment.user._id == userId.value)
const isLiked = computed(() => comment.likes.some(el => el.user == userId.value))
const likeButtonValue = computed(() => isLiked.value ? 'Unlike' : 'Like')
const likeCommentSegment = computed(() => `comments/${comment._id}`)

const handleLike = async () => {
    await likeDocument(likeCommentSegment.value)
}
</script>

<template>
    <div class="border border-blue-300 rounded-md shadow-md shadow-blue-300/50 bg-blue-100 m-4 p-2">
        <p class="p-2 m-2 text-2xl">{{ comment.content }} <span class="italic text-sm">({{ comment.user.name }})</span> </p>
        <LikeBar :length="comment.likes.length" :button-value="likeButtonValue" @like="handleLike" />
        <AuthorForm v-if="isAuthor" :comment="comment" />
    </div>
</template>