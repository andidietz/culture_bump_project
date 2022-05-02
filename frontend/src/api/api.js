import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

class CultureBumpApi {
  static token

  static async request(endpoint, data={}, method="get") {
    const url = `${BASE_URL}/${endpoint}`
    const headers = {Authorization: `Bearer ${CultureBumpApi.token}`}
    const params = (method === 'get') ? data : {}

    try {
      return (await axios({url, method, data, params, headers})).data
    } catch (err) {
      const message = err.response.data.error.massage
      throw Array.isArray(message) ? message : [message]
    }
  }

  static async login(data) {
    const res = await this.request(`auth/token`, data, 'post')
    return res.token
  }

  static async signup(data) {
    const res = await this.request(`auth/register`, data, 'post')
    return res.token
  }

  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, 'post')
    return res.user
  }

  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`)
    return res.user
  }

  static async getUserBumps(username) {
    const res = await this.request(`users/${username}/reference-points`)
    return res.userBumps
  }

  static async getUserTags(username) {
    const res = await this.request(`users/${username}/tags`)
    return res.userBumps
  }

  static async getUserBookmarks(username) {
    const res = await this.request(`/users/${username}/bookmarks`)
  }

  static async deleteRefPoint(id) {
    const res = await this.request(`directory/${id}`)
    return res.refPoint
  }

  static async addRefPoint(id) {
    const res = await this.request(`directory/${id}`)
    return res.refPoint
  }

  static async getRefPoint(id) {
    const res = await this.request(`directory/${id}`)
    return res.refPoint
  }

  static async getAllRefPoints() {
    const res = await this.request(`directory/`)
    return res.refPoints
  }

  static async deleteRefPoint(id) {
    const res = await this.request(`directory/${id}`)
    return res.refPoint
  }
}

export default CultureBumpApi