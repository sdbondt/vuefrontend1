const envs = import.meta.env

import axios from "axios"
import { handleApiError } from "../utils/apiErrorHandler"
import { authHeader } from "../utils/authHeader"

const postsURL = envs.VITE_API_URL + 'posts/'
const commentsURL = envs.VITE_API_URL + 'comments/'

export const createCommentService = async (postId, content) => {
    try {
        const res = await axios.post(postsURL + postId + '/comments', { content }, authHeader())
        return res.data.comment
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while adding your comment.'))
    }
}

export const deleteCommentService = async (commentId) => {
  try {
    await axios.delete(commentsURL + commentId, authHeader())
  } catch (e) {
    throw new Error(handleApiError(e, 'Something went wrong while deleting your comment.'))
  }

}

export const updateCommentService = async (commentId, content) => {
  try {
    const res = await axios.patch(commentsURL + commentId, { content }, authHeader())
    return res.data.comment
  } catch (e) {
    throw new Error(handleApiError(e, 'Something went wrong while updating your comment.'))
  }
}