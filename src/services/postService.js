const envs = import.meta.env

import axios from "axios"
import { handleApiError } from "../utils/apiErrorHandler"
import { authHeader } from '../utils/authHeader'

const postsURL = envs.VITE_API_URL + 'posts/'

export const createPostService = async (postData) => {
    try {
        const res = await axios.post(postsURL, postData, authHeader())
        return res.data.post
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while creating your post.'))
    } 
}

export const fetchPostsService = async (queryString) => {
    try {
        const res = await axios.get(postsURL + queryString, authHeader())
        return res.data
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while fetching the posts.'))
    }   
}

export const fetchPostSerivce = async (postId) => {
    try {
        const res = await axios.get(postsURL + postId, authHeader())
        return res.data.post     
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while fetching the post.'))
    }
}

export const updatePostService = async (postId, obj) => {
    try {
        const res = await axios.patch(postsURL + postId, obj, authHeader())
        return res.data.post
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while updating the post.'))
    }
}

export const deletePostService = async (postId) => {
    try {
        await axios.delete(postsURL + postId, authHeader())
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while deleting your post.'))
    }
}
