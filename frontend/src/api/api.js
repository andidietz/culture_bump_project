import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

class CultureBumpApi {
  static token;

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


  // Auth Requests

  static async login(data) {
    const {username, password} = data
    const requestData = {
      username, password
    }
    const res = await this.request(`users/token`, requestData, 'post')
    return res.token
  }

  static async signup(data) {
    const res = await this.request(`users/register`, data, 'post')
    return res.token
  }


  // User Requests

  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`)
    return res.user
  } 

  static async getUserTags(username) {
    const res = await this.request(`users/${username}/tags`)
    return res.tags
  }

  static async getUserReferencePoints(username) {
    const res = await this.request(`users/${username}/referencePoints`)
    return res.referencePoints
  }

  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, 'patch')
    return res.user
  }



  // Resources Requests

  static async addTag(username, data) {
    const res = await this.request(`users/${username}/tags`, data, 'post')
    return res.tag
  }

  static async addReferencePoint(data) {
    const res = await this.request('directory', data, 'post')
    return res.bump
  }

  static async getTags() {
    const res = await this.request(`directory/tags`)
    return res.tags
  }

  static async deleteReferencePoint(id) {
    const res = await this.request(`directory/${id}`, id, 'delete')
    return res.referencePoint
  }



  // Directory Requests

  static async addToDirectory(id, data) {
    const res = await this.request(`directory/${id}`, data, 'patch')
    return res
  }

  static async getCategories() {
    const res = await this.request('directory/categories')
    return res.categories
  }

  static async getSubcategories(id) {
    const res = await this.request(`directory/categories/${id}`)
    return res.subcategories
  }

  static async getHeaders(categoryId, subcategoryId) {
    const res = await this.request(`directory/categories/${categoryId}/subcategories/${subcategoryId}`)
    return res.headers
  }

  static async getHeaderValues(username) {
    const res = await this.request(`directory/header/${username}`)
    return res.headerValues
  }

  static async getSpecificReferencePointInfoById(id) {
    const res = await this.request(`directory/${id}`)
    return res.referencePoint
  }

  static async getBasicReferencePointInfoById(id) {
    const res = await this.request(`steps/${id}`)
    return res.referencePoint
  }
}

CultureBumpApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"

export default CultureBumpApi