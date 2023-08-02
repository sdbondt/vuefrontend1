<script setup>
import Button from '../ui/Button.vue';
import { useRoute } from 'vue-router';
import { useCommentsStore } from '../../store/commentsStore'
import { ref } from 'vue';

const content = ref('')

const route = useRoute()
const commentsStore = useCommentsStore()
const { createComment } = commentsStore

const handleSubmit = async () => {
    await createComment(route.params.postId, content.value)
}
</script>

<template>
    <h4 class="text-lg p-2 m-2">Add a Comment</h4>
    <form @submit.prevent="handleSubmit">
        <textarea class="custom-textarea" rows="5" cols="20" v-model="content"  placeholder="Add a comment"></textarea>
        <Button>Comment</Button>
    </form>
</template>