<script setup>
import Button from '../ui/Button.vue';
import { ref, reactive} from 'vue'
import { usePostsStore } from '../../store/postsStore'

const postsStore = usePostsStore()

const { post } = defineProps(['post'])
const { deletePost, updatePost } = postsStore

const displayUpdateForm = ref(false)
const updateData = reactive({
    content: post.content,
    title: post.title
})

const switchDisplayUpdateForm = () => displayUpdateForm.value = !displayUpdateForm.value

const handleDelete = async () => {
    await deletePost(post._id)
}

const handleUpdate = async () => {
    await updatePost(post._id, updateData)
}
</script>

<template>
    <div>
        <Button @click="switchDisplayUpdateForm">Update your post</Button>
        <Button @click="handleDelete">Delete your post</Button>
    </div>
    <form v-if="displayUpdateForm" @submit.prevent="handleUpdate">
        <div>
            <label class="m-2 p-2" for="updateTitle">New Title</label><br>
            <input class="custom-input" name="updateTitle" type="text" v-model="updateData.title" />
        </div>
        <div>
            <label class="m-2 p-2" for="updateContent">New Content</label><br>
            <textarea class="custom-textarea" name="updateContent" v-model="updateData.content"></textarea>
        </div>
        <Button >Update</Button>
    </form>
</template>