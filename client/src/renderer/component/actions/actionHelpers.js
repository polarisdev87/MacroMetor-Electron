export const constructRequestConfig = (method, url, token, data) => ({
  method,
  url,
  headers: {
    Authorization:
      `Bearer ${token}`
  },
  data
})

export const baseUrl = 'https://macro-mentor-api-service-dot-macromentor.ue.r.appspot.com/api/v1'
