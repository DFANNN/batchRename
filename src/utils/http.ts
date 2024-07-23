import axios from 'axios'
import { ElMessage } from 'element-plus'
import { AxiosResponse } from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000
})

// 响应拦截器
http.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.code === 500) {
    console.log(response.data.msg)
    ElMessage.error(response.data.msg)
  }

  return response
})

export default http
