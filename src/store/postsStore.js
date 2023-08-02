const envs = import.meta.env
import { computed, ref, reactive } from "vue"
import { defineStore } from "pinia"
import { createPostService, deletePostService, fetchPostSerivce, fetchPostsService, updatePostService } from "../services/postService"
import { useCommentsStore } from "./commentsStore"
import { storeMethodHandler } from "../utils/storeMethodHandler"
import { createQueryString } from '../utils/createQueryString'
import { useRouter } from "vue-router"

export const usePostsStore = defineStore('posts', () => {
    const posts = ref([])
    const post = ref({})
    const totalCount = ref(0)
    const searchParams = reactive({
        limit: 10,
        page: 1,
        direction: 'desc',
        sortBy: 'date',
        q: ''
    })
    const maxPage = computed(() => parseInt(Math.ceil(totalCount.value/searchParams.limit), 10))
    const queryString = computed(() => createQueryString(searchParams))

    const commentsStore = useCommentsStore()
    const { setComments } = commentsStore

    const router = useRouter()

    const setPost = (newPost) => {
        post.value = newPost
    }

    const setPosts = (updatedPostsArr) => {
        posts.value = updatedPostsArr
    }

    const updateParams = (name, value) => {
        searchParams[name] = value
    }

    const setPage = (newPage) => {
        if (newPage < 1) searchParams.page = 1
        else if (newPage > maxPage.value) searchParams.page = maxPage.value
        else if (isNaN(newPage) || !Number.isInteger(newPage)) searchParams.page = 1
        else {
            searchParams.page = newPage
        }
    }

    const createPost = async (postData) => {
        await storeMethodHandler(async () => {
            const createdPost = await createPostService(postData)
            setPosts([createdPost, ...posts.value])
            totalCount.value = totalCount.value + 1
        })
    }

    const fetchPosts = async () => {
        await storeMethodHandler(async () => {
            const { posts: fetchedPosts, totalCount: fetchedTotalCount} = await fetchPostsService(queryString.value)
            setPosts(fetchedPosts)
            totalCount.value = fetchedTotalCount
            if(searchParams.page > maxPage.value) setPage(1)
        })
    }

    const fetchPost = async (postId) => {
        await storeMethodHandler(async () => {
            const  fetchedPost = await fetchPostSerivce(postId)
            setPost(fetchedPost)
            setComments(fetchedPost.comments)
        })
    }

    const updatePost = async (postId, postData) => {
        await storeMethodHandler(async () => {
            const updatedPost = await updatePostService(postId, postData)
            setPost(updatedPost)
        })
    }

    const deletePost = async (postId) => {
        await storeMethodHandler(async () => {
            await deletePostService(postId)
            router.push('/posts')
        })   
    }

return { posts, post, maxPage, totalCount, searchParams, queryString, updateParams, createPost, fetchPosts, fetchPost, updatePost, deletePost, setPost, setPage }
})
    