<script setup>
import CommentItem from './CommentItem.vue'
const { comments } = defineProps(['comments'])
</script>

<template>
    <div v-if="comments.length > 0" v-for="comment in comments" :key="comment._id">
        <CommentItem :comment="comment" />
    </div>
</template>