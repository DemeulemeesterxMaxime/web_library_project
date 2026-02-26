import axios from 'axios'
import { API_URL } from '../config'

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default httpClient
