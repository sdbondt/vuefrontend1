export const handleApiError = (e, msg = 'Something went wrong.') => {
    if (e.response && e.response.data && e.response.data.message) {
        return e.response.data.message
      } else {
        return msg
      }
}