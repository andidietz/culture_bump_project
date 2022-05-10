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
    console.log('Api login - data', requestData)
    const res = await this.request(`users/token`, requestData, 'post')
    return res.token
  }

  static async signup(data) {
    console.log('hitting signup api', data)
    const res = await this.request(`users/register`, data, 'post')
    return res.token
  }

  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, 'post')
    return res.user
  }

  // Bug here
  static async getCurrentUser(username) {
    console.log('getUser', username)
    const res = await this.request(`users/${username}`)
    
    return res.user
  }

  static async getUserBumps(username) {
    const res = await this.request(`users/${username}/reference-points`)
    console.log('getUserBumps - ', username, ', res', res)

    return res.userBumps
  }

  static async getUserTags(username) {
    const res = await this.request(`users/${username}/tags`)
    return res.userBumps
  }

  static async getUserBookmarks(username) {
    const res = await this.request(`/users/${username}/bookmarks`)
    return res.bookmarks
  }

  static async addBump(data) {
    console.log('Api - addBump(data) - data', data)

    const res = await this.request('directory', data, 'post')
    console.log('Api -addBump res', res)

    return res.bump
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

CultureBumpApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"

export default CultureBumpApi