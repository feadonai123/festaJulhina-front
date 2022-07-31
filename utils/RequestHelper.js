import axios from 'axios'

export default class RequestHelper {

  static HEADERS = {
    'Content-Type': 'application/json',
  }

  static async get (url) {

    let success = false, result = undefined, message = undefined

    try {
      const response = await axios.get(url)
      if(!response.data.success) throw new Error(response.data.message)

      result = response.data.data
      success = true
    } catch (e) {
      message = e.response.data.message || e.message || "Erro desconhecido"
    }

    return { success, data: result, message }
  }

  static async delete (url) {

    let success = false, result = undefined, message = undefined

    try {
      const response = await axios.delete(url)
      if(!response.data.success) throw new Error(response.data.message)

      result = response.data.data
      success = true
    } catch (e) {
      message = e.response.data.message || e.message || "Erro desconhecido"
      console.log(message)
    }

    return { success, data: result, message }
  }

  static async post (url, data, headers = {}) {

    let success = false, result = undefined, message = undefined

    const mixedHeaders = { headers: { ...RequestHelper.HEADERS, ...headers } }

    try {
      const response = await axios.post(url, data, mixedHeaders)
      if(!response.data.success) throw new Error(response.data.message)

      result = response.data.data
      success = true
    } catch (e) {
      message = e.response.data.message || e.message || "Erro desconhecido"
      console.log(message)
    }

    return { success, data: result, message }
  }

  static async patch (url, data, headers = {}) {

    let success = false, result = undefined, message = undefined

    const mixedHeaders = { headers: { ...RequestHelper.HEADERS, ...headers } }

    try {
      const response = await axios.patch(url, data, mixedHeaders)
      if(!response.data.success) throw new Error(response.data.message)

      result = response.data.data
      success = true
    } catch (e) {
      message = e.response.data.message || e.message || "Erro desconhecido"
      console.log(message)
    }

    return { success, data: result, message }
  }

}