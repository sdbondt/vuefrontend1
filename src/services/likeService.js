const envs = import.meta.env
import axios from "axios"
import { authHeader } from "../utils/authHeader"
import { handleApiError } from "../utils/apiErrorHandler"

export const likeDocumentService = async (urlSegment) => {
    try {
        const res = await axios.post(envs.VITE_API_URL + urlSegment + '/likes', null, authHeader())
        return res.data.document
      } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while liking this documenet.'))
      }
}