import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { createCommentService, deleteCommentService, updateCommentService } from "../services/commentService";
import { storeMethodHandler } from "../utils/storeMethodHandler";

export const useCommentsStore = defineStore('comments', () => {
    const comments = ref([])
    const comment = ref({})  
    const currentPage = ref(1)
    const commentsPerPage = 10

    const paginatedComments = computed(() => {
        const startIndex = (currentPage.value - 1) * commentsPerPage
        const endIndex = startIndex + commentsPerPage
        return comments.value.slice(startIndex, endIndex)
    })
    const maxPage = computed(() => Math.ceil(comments.value.length/commentsPerPage))

    const setComments = (updatedComments) => {
        comments.value = updatedComments
    }

    const setPage = (newPage) => {
        console.log(newPage)
        if (newPage < 1) currentPage.value = 1
        else if (newPage > maxPage.value) currentPage.value = maxPage.value
        else if (isNaN(newPage) || !Number.isInteger(newPage)) currentPage.value = 1
        else {
            currentPage.value = newPage
        }
    }

    const createComment = async (postId, content) => {
        await storeMethodHandler(async () => {
            const createdComment = await createCommentService(postId, content)
            setComments([createdComment, ...comments.value])
        })
    }

    const updateComment = async (commentId, content) => {
        await storeMethodHandler(async () => {
            const updatedComment = await updateCommentService(commentId, content)
            const updatedComments = comments.value.map((el) => {
                if (el._id === commentId) return updatedComment
                else {
                    return el
                }
            })
            setComments(updatedComments)
        })
    }

    const deleteComment = async (commentId) => {
        await storeMethodHandler(async () => {
            await deleteCommentService(commentId)
            const newComments = comments.value.filter((el) => el._id !== commentId)
            setComments(newComments)
        })
    }
    return { comments, comment, currentPage, paginatedComments, maxPage, createComment, updateComment, deleteComment, setComments, setPage }
})