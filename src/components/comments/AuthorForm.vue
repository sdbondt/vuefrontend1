<script setup>
import Button from '../ui/Button.vue';
import { ref } from 'vue';
import { useCommentsStore } from '../../store/commentsStore';

const { comment } = defineProps(['comment'])
const showUpdateDisplay = ref(false)
const content = ref(comment.content)
const commentsStore = useCommentsStore()
const { deleteComment, updateComment } = commentsStore

const switchUpdateDisplay = () => showUpdateDisplay.value = !showUpdateDisplay.value

const handleDelete = async () => {
    await deleteComment(comment._id)
}

const handleUpdate = async () => {
    await updateComment(comment._id, content.value)
}

</script>

<template>
    <Button @click="switchUpdateDisplay">Update Comment</Button>
    <Button @click="handleDelete">Delete Comment</Button>
    <form v-if="showUpdateDisplay" @submit.prevent="handleUpdate">
        <textarea class="custom-textarea" rows="5" cols="20" v-model="content" ></textarea>
        <Button>Update</Button>
    </form>
</template>