import { defineStore, storeToRefs } from "pinia";
import { usePostsStore } from "./postsStore";
import { useCommentsStore } from "./commentsStore";
import { likeDocumentService } from "../services/likeService";
import { storeMethodHandler } from "../utils/storeMethodHandler";

export const useLikeStore = defineStore('likes', () => {
    const postsStore = usePostsStore()
    const commentStore = useCommentsStore()
    const { setPost } = postsStore
    const { setComments } = commentStore
    const { comments } = storeToRefs(commentStore)

    const likeDocument = async (urlSegment) => {
        await storeMethodHandler(async () => {
            const likedDocument = await likeDocumentService(urlSegment)
            if (likedDocument.onModel = 'Comment') {
                const newCommentsArr = comments.value.map((el) => {
                    if (el._id == likedDocument._id) return likedDocument
                    else {
                        return el
                    }
                })
                setComments(newCommentsArr)
            }
            if (likeDocument.onModel = 'Post') {
                setPost(likedDocument)
            }
        })
    }

    return { likeDocument }
})