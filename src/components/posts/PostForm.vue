<script setup>
import Button from '../ui/Button.vue';
import { reactive } from 'vue';
import { usePostsStore } from '../../store/postsStore'
const postData = reactive({
    content: '',
    title: ''
})
const { createPost } = usePostsStore()
const handleSubmit = async () => {
    await createPost(postData)
}
</script>

<template>
    <div class="px-4 py-2 m-2 bg-blue-200 border rounded-md shadow-md mx-auto w-1/3">
        <h3 class="text-xl font-semibold m-4">Add a Post</h3>
        <form @submit.prevent="handleSubmit">
            <input class="custom-input w-64" type="text" placeholder="give the post a title..." v-model="postData.title" />
            <textarea class="custom-textarea" rows="5" cols="20" placeholder="add a post here..." v-model="postData.content"></textarea>
            <Button>Add Post</Button>
        </form>
    </div>
</template>