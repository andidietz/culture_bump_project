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

  static async login(data) {
    const {username, password} = data
    const requestData = {
      username, password
    }
    // console.log('Api login - data', requestData)
    const res = await this.request(`users/token`, requestData, 'post')
    return res.token
  }

  static async signup(data) {
    // console.log('hitting signup api', data)
    const res = await this.request(`users/register`, data, 'post')
    return res.token
  }

  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, 'post')
    return res.user
  }

  static async getCurrentUser(username) {
    // console.log('Api.js - getCurrentUser', username)
    const res = await this.request(`users/${username}`)
    
    return res.user
  } 

  static async getUserReferencePoints(username) {
    // console.log('getUserReferencePoints - ', username)

    const res = await this.request(`users/${username}/referencePoints`)
    // console.log('getUserReferencePoints - ', username, ', res', res)

    return res.referencePoints
  }

  static async getTags() {
    // console.log('getTags - ----------')
    const res = await this.request(`directory/tags`)
    // console.log('getUserTags -  res', res)

    return res.tags
  }

  static async getUserTags(username) {
    // console.log('getUserTags - ', username)
    const res = await this.request(`users/${username}/tags`)
    // console.log('getUserTags - ', username, ', res', res)

    return res.tags
  }

  static async getUserBookmarks(username) {
    const res = await this.request(`/users/${username}/bookmarks`)
    return res.bookmarks
  }

  static async addTag(username, data) {
    // console.log('Api - addtag(data) - data', username, '-', data)

    const res = await this.request(`users/${username}/tags`, data, 'post')
    // console.log('Api -addTag res', res)

    return res.tag
  }

  static async addReferencePoint(data) {
    // console.log('Api - addBump(data) - data', data)

    const res = await this.request('directory', data, 'post')
    // console.log('Api -addBump res', res)

    return res.bump
  }

  static async addRefPoint(id) {
    const res = await this.request(`directory/${id}`)
    return res.refPoint
  }

  static async getSpecificReferencePointInfoById(id) {
    // console.log('API - getReferencePointById - id', id)
    const res = await this.request(`directory/${id}`)
    // console.log('API - getReferencePointById - res', res)

    return res.referencePoint
  }

  static async getBasicReferencePointInfoById(id) {
    // console.log('API - getBasicReferencePointInfoById - id', id)

    const res = await this.request(`steps/${id}`)
    // console.log('API - getBasicReferencePointInfoById - res', res)

    return res.referencePoint
  }

  static async getAllRefPoints() {
    const res = await this.request(`directory/`)
    return res.refPoints
  }

  static async deleteRefPoint(id) {
    const res = await this.request(`directory/${id}`)
    return res.refPoint
  }

  static async getCategories() {
    // console.log('API - getCategories - hitting')
    const res = await this.request('directory/categories')
    // console.log('API - getCategories - res', res)

    return res.categories
  }

  static async getSubcategories(id) {
    // console.log('API - getSubcategories - hitting')
    const res = await this.request(`directory/categories/${id}`)
    // console.log('API - getSubcategories - res', res)

    return res.subcategories
  }

  static async getHeaders(categoryId, subcategoryId) {
    // console.log('API - getHeaders - hitting')
    const res = await this.request(`directory/categories/${categoryId}/subcategories/${subcategoryId}`)
    // console.log('API - getHeaders - res', res)

    return res.headers
  }

  static async getHeaderValues(username) {
    // console.log('API - getHeaderInfo - hitting')
    const res = await this.request(`directory/header/${username}`)
    // console.log('API - getHeaderInfo - res', res)

    return res.headerValues
  }


  static async addToDirectory(id, data) {
    // console.log('API - addToDirectory - id, data', id, data)
    const res = await this.request(`directory/${id}`, data, 'patch')
    // console.log('API - addToDirectory - res', res)

    return res
  }
}

CultureBumpApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"

export default CultureBumpApi